import React from 'react';
import { CodeBlock } from '../components/CodeBlock';
import { ExternalLink } from 'lucide-react';

export interface DocSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface DocCategory {
  title: string;
  items: DocSection[];
}

export const docData: DocCategory[] = [
  {
    title: "Getting Started",
    items: [
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <>
            <p className="mb-4 text-lg leading-relaxed text-slate-600">
              Welcome to <strong>Speech to Text NER Psycology</strong>. This method provides a robust toolkit for processing conversational audio data and cleaning text transcripts for NLP tasks.
            </p>
            <p className="mb-4 leading-relaxed text-slate-600">
              This documentation uses the whisper model and whisper's engine. It can be run using the whisperX engine and faster-wshiper. Designed for researchers and developers, Speech to Text NER Psychology simplifies the workflow from raw audio to clean, tokenized text. The software is optimized for handling large datasets and specialized conversational data.
            </p>
            <p className="mb-4 leading-relaxed text-slate-600">
              Documentation based on paper Q1 with the title:<br></br><b>"A Benchmark Suite for Indonesian Mental Health NER: Combining Real Counseling Audio Transcripts and Adapted Text Data"</b>
            </p>
            <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <h4 className="text-orange-900 font-medium mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-orange-800 space-y-1">
                <li>High-performance Audio-to-Text transcription pipeline.</li>
                <li>Advanced text preprocessing (URL removal, symbol stripping).</li>
                <li>Redundancy detection for conversational datasets.</li>
                <li>Name Entity Recognition (NER) for psychology domain.</li>
              </ul>
            </div>
          </>
        )
      },
      {
        id: "installation",
        title: "Installation",
        content: (
          <>
            <p className="mb-4 leading-relaxed text-slate-600">
              Before installing, make sure your <b>system is up to date</b>. Update the package list in your virtual environment, install <b>FFmpeg</b> as a tool for processing audio and video, and select the <b>Whisper engine</b> to use. Ensure that the audio file is in <b>.wav</b> or <b>.mp3</b> format; the recommended format is <b>.wav</b>.
            </p>
            <p className="mb-4 leading-relaxed text-slate-600">
              Update package list in virtual environment.
            </p>
            <CodeBlock language="bash">
              !apt-get update -y
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              Install FFmpeg, a tool for processing audio and video.
            </p>
            <CodeBlock language="bash">
!apt-get install -y ffmpeg
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              Install WhisperX engine langsung dari GitHub (bukan dari PyPI). Library buat ngolah data tabel (DataFrame). Library buat progress bar. install tanpa banyak log (biar output notebook rapi).
            </p>
            <CodeBlock language="bash">
!pip install -q git+https://github.com/m-bain/whisperX.git pandas tqdm
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              or install faster-whisper engine for faster processing.
            </p>
            <CodeBlock language="bash">
              !pip install faster-whisper
            </CodeBlock>
          </>
        )
      }
    ]
  },
  {
    title: "Audio Processing",
    items: [
      {
        id: "audio-to-text",
        title: "1. Audio to Text",
        content: (
          <>
          <p className="mb-4 leading-relaxed text-slate-600">
              The whisper handles the conversion of raw audio files into text. It supports batch processing for large datasets.
            </p>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Libraries</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              This code imports the required libraries for running the Faster-Whisper speech-to-text model, handling files, managing memory, and processing transcription results with pandas..
            </p>
            <CodeBlock>
{`from faster_whisper import WhisperModel
import os
import pandas as pd
import gc
import torch`}
            </CodeBlock>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Configuration</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              Initialize the model with your chosen model (default is 'base'), as well as the raw audio folder and output folder.
            </p>
            <CodeBlock>
{`input_folder = 'input_folder'
output_folder = 'output_folder'
model_size = "large-v3"
device = "cuda"
compute_type = "float16"`}
            </CodeBlock>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Load Model</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
             This code loads the Faster-Whisper model based on the specified model size, device, and compute type, and handles errors if the model fails to load. 
            </p>
            <CodeBlock>
{`try:
    model = WhisperModel(
        model_size,
        device=device,
        compute_type=compute_type
    )
    print("Model loaded successfully.")
except Exception as e:
    print(f"Failed to load model: {e}")
    raise`}
            </CodeBlock>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Transcribe Process</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
             This code performs audio transcription using the Faster-Whisper model with beam search for improved accuracy, collects the generated transcription segments. faster-whisper uses a generator, so we have to loop to get the data.
            </p>
            <CodeBlock>
{` segments, info = model.transcribe(audio_path, beam_size=5, language="id")
 data_transkrip = []`}
            </CodeBlock>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Result Segments</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
             This code appends each transcription segment to a list by storing the start time, end time (rounded to two decimal places), and the cleaned transcribed text.
            </p>
            <CodeBlock>
{` data_transkrip.append({
  "start": round(segment.start, 2),
  "end": round(segment.end, 2),
  "text": segment.text.strip()
 })`}
            </CodeBlock>
          </>
        )
      }
    ]
  },
  {
    title: "Text Preprocessing",
    items: [
      {
        id: "cleaning-text",
        title: "2. Cleaning Text",
        content: (
          <>
            <p className="mb-4 leading-relaxed text-slate-600">
              Conversational text often contains noise like URLs, special symbols, and redundant phrases. The module provides a chainable API to clean this data.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">The Cleaning Pipeline</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              This code ensures that the DataFrame has an id column with sequential values and normalizes text by converting it to lowercase, removing non-alphabetic characters, and cleaning extra whitespace.
            </p>

            <CodeBlock>
{`if 'id' not in df.columns:
    df['id'] = range(1, len(df) + 1)

def normalize_text(text):
    text = str(text).lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text`}
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              This code defines a chainable text preprocessing utility to remove URLs and symbols, convert text to lowercase, and return the cleaned output.
            </p>

            <CodeBlock>
{`import re

class TextPreprocessor:
    def __init__(self, text: str):
        self.text = text

    def remove_urls(self):
        self.text = re.sub(r'https?://\S+|www\.\S+', '', self.text)
        return self

    def remove_symbols(self, keep_punctuation: bool = False):
        if keep_punctuation:
            self.text = re.sub(r'[^\w\s.,!?;:]', '', self.text)
        else:
            self.text = re.sub(r'[^\w\s]', '', self.text)
        return self

    def lowercase(self):
        self.text = self.text.lower()
        return self

    def get(self):
        return self.text.strip()


def set_text(raw_text: str) -> TextPreprocessor:
    return TextPreprocessor(raw_text)`}
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              This code cleans the dataset by removing empty or invalid text entries, normalizing the text, tokenizing it, and resetting the DataFrame index to ensure a consistent and clean preprocessing pipeline.
            </p>
            <CodeBlock>
{`df = df.dropna(subset=['text'])
df = df[~df['text'].astype(str).str.lower().isin(['nan', '', 'none', 'null'])]
df = df.reset_index(drop=True)
df['text'] = df['text'].apply(normalize_text)
df['tokens'] = df['text'].apply(word_tokenize)
df = df[~df['tokens'].astype(str).str.contains("'nan'")]
df = df.reset_index(drop=True)`}
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              This code preprocesses the dataset by removing invalid text entries, normalizing and tokenizing the text, and ensuring a clean, non-redundant DataFrame structure.
            </p>
            <CodeBlock>
{`df = df.dropna(subset=['text'])
df = df[~df['text'].astype(str).str.lower().isin(['nan', '', 'none', 'null'])]

df['text'] = df['text'].apply(normalize_text)
df['tokens'] = df['text'].apply(word_tokenize)

df = df[df['tokens'].notna()].reset_index(drop=True)`}
            </CodeBlock>
          </>
        )
      }
    ]
  },
  // {
  //   title: "Applications",
  //   items: [
  //     {
  //       id: "demo-application",
  //       title: "Live Demo",
  //       content: (
  //         <>
  //           <p className="mb-4 text-lg leading-relaxed text-slate-600">
  //             Please try it yourself directly with our interactive demo application.
  //           </p>
  //           <p className="mb-6 leading-relaxed text-slate-600">
  //             Upload your own audio files or paste raw text to see the cleaning pipeline in action. The demo showcases the full capabilities of the library, including noise reduction, entity extraction, and redundancy filtering.
  //           </p>
            
  //           <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
  //             <h3 className="text-lg font-semibold text-slate-900 mb-2">Speech to Text NER Psycology</h3>
  //             <p className="text-slate-600 mb-6">
  //               A web-based interface for testing and visualizing the processing pipeline. No installation required.
  //             </p>
  //             <a 
  //               href="https://example.com/demo" 
  //               target="_blank" 
  //               rel="noopener noreferrer"
  //               className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
  //             >
  //               Launch Application
  //               <ExternalLink size={18} />
  //             </a>
  //           </div>
  //         </>
  //       )
  //     }
  //   ]
  // }
];
