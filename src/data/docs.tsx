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
              Welcome to <strong>CleanSpeech</strong>. This library provides a robust toolkit for processing conversational audio data and cleaning text transcripts for NLP tasks.
            </p>
            <p className="mb-4 leading-relaxed text-slate-600">
              Designed for researchers and developers, CleanSpeech simplifies the pipeline from raw audio to clean, tokenizable text. It is optimized for handling large datasets and custom conversational data.
            </p>
            <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-lg">
              <h4 className="text-orange-900 font-medium mb-2">Key Features</h4>
              <ul className="list-disc list-inside text-orange-800 space-y-1">
                <li>High-performance Audio-to-Text transcription pipeline.</li>
                <li>Advanced text preprocessing (URL removal, symbol stripping).</li>
                <li>Redundancy detection for conversational datasets.</li>
                <li>Pandas-compatible API.</li>
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
              Install CleanSpeech using pip. We recommend using a virtual environment.
            </p>
            <CodeBlock language="bash">
              pip install cleanspeech
            </CodeBlock>
            <p className="mb-4 leading-relaxed text-slate-600">
              Or install from source:
            </p>
            <CodeBlock language="bash">
{`git clone https://github.com/example/cleanspeech.git
cd cleanspeech
pip install -e .`}
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
              The <code>AudioProcessor</code> class handles the conversion of raw audio files into text. It supports batch processing for large datasets.
            </p>
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Basic Usage</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              Initialize the processor with your model of choice (default is 'base').
            </p>
            <CodeBlock>
{`from cleanspeech import AudioProcessor

# Initialize
processor = AudioProcessor(model='whisper-base')

# Transcribe a single file
result = processor.transcribe("path/to/audio.wav")
print(result.text)`}
            </CodeBlock>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Batch Processing Custom Datasets</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              For custom datasets, use the <code>transcribe_batch</code> method. This method accepts a list of file paths or a directory.
            </p>
            <CodeBlock>
{`import glob

# Get all wav files
files = glob.glob("./my_dataset/*.wav")

# Process in batch with progress bar
results = processor.transcribe_batch(
    files, 
    batch_size=16, 
    export_format="pandas"
)

# Save to CSV
results.to_csv("raw_transcripts.csv")`}
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
              Conversational text often contains noise like URLs, special symbols, and redundant phrases. The <code>TextCleaner</code> module provides a chainable API to clean this data.
            </p>
            
            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">The Cleaning Pipeline</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              You can define a custom pipeline to apply specific cleaning rules.
            </p>

            <CodeBlock>
{`from cleanspeech import TextCleaner

cleaner = TextCleaner()

raw_text = "Check this out!!! https://example.com #wow"

# Chain methods
clean_text = (
    cleaner
    .set_text(raw_text)
    .remove_urls()
    .remove_symbols(keep_punctuation=False)
    .lowercase()
    .get()
)

print(clean_text)
# Output: "check this out wow"`}
            </CodeBlock>

            <h3 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Handling Redundancy</h3>
            <p className="mb-4 leading-relaxed text-slate-600">
              In conversational datasets, users often repeat themselves. Use <code>deduplicate_sentences</code> to filter these out based on semantic similarity.
            </p>
            <CodeBlock>
{`# Remove redundant sentences within a conversation window
df['clean_text'] = cleaner.deduplicate_sentences(
    df['raw_text'], 
    threshold=0.85
)`}
            </CodeBlock>
          </>
        )
      }
    ]
  },
  {
    title: "Applications",
    items: [
      {
        id: "demo-application",
        title: "Live Demo",
        content: (
          <>
            <p className="mb-4 text-lg leading-relaxed text-slate-600">
              Experience the power of CleanSpeech in real-time with our interactive demo application.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              Upload your own audio files or paste raw text to see the cleaning pipeline in action. The demo showcases the full capabilities of the library, including noise reduction, entity extraction, and redundancy filtering.
            </p>
            
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">CleanSpeech Studio</h3>
              <p className="text-slate-600 mb-6">
                A web-based interface for testing and visualizing the processing pipeline. No installation required.
              </p>
              <a 
                href="https://example.com/demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
              >
                Launch Application
                <ExternalLink size={18} />
              </a>
            </div>
          </>
        )
      }
    ]
  }
];
