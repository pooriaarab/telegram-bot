import { AgentExecutor, Tool, initializeAgentExecutor } from "langchain/agents";
import { ChatOpenAI } from "langchain/chat_models";
import { BufferMemory } from "langchain/memory";
import { Configuration } from "openai";
import { OpenAIApi } from "openai";
import { googleTool } from "./tools/google";

const openAIApiKey = process.env.OPENAI_API_KEY;
if (!openAIApiKey) {
  throw new Error("OPENAI_API_KEY is required");
}

const params = {
  verbose: true,
  temperature: 1,
  openAIApiKey,
  modelName: process.env.OPENAI_MODEL ?? "gpt-4",
  maxConcurrency: 1,
  maxTokens: 1000,
  maxRetries: 5,
};

export class Model {
  public tools: Tool[];
  public openai: OpenAIApi;
  public model: ChatOpenAI;
  // Cache the promise, not the resolved executor, so two concurrent call()s
  // share one executor and therefore one conversation memory.
  private executorPromise?: Promise<AgentExecutor>;

  constructor() {
    const configuration = new Configuration({
      apiKey: openAIApiKey,
    });

    this.tools = [googleTool];
    this.openai = new OpenAIApi(configuration);
    this.model = new ChatOpenAI(params, configuration);
  }

  private async initExecutor(): Promise<AgentExecutor> {
    const executor = await initializeAgentExecutor(
      this.tools,
      this.model,
      "chat-conversational-react-description",
      true,
    );
    executor.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
      inputKey: "input",
    });
    return executor;
  }

  public async call(input: string) {
    this.executorPromise ??= this.initExecutor();
    const executor = await this.executorPromise;

    const response = await executor.call({ input });

    console.log("Model response: " + response);

    return response.output;
  }
}
