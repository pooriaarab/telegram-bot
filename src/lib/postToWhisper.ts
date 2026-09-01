import { createReadStream } from "fs";
import { OpenAIApi } from "openai";

type TranscriptionFile = Parameters<OpenAIApi["createTranscription"]>[0];

export async function postToWhisper(openai: OpenAIApi, audioFilePath: string) {
  const transcript = await openai.createTranscription(
    createReadStream(audioFilePath) as unknown as TranscriptionFile,
    "whisper-1",
  );
  return transcript.data.text;
}
