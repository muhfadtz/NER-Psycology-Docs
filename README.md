# Speech to Text NER Psychology

Documentation and implementation suite for Indonesian Mental Health Named Entity Recognition (NER), combining counseling audio transcripts with adapted text data.

## Project Overview

This repository provides a robust toolkit for processing conversational audio data and performing text normalization for NLP tasks. It is specifically optimized for handling large datasets and specialized counseling interactions in the Indonesian language.

The documentation and underlying methods are based on the research paper:
**"A Benchmark Suite for Indonesian Mental Health NER: Combining Real Counseling Audio Transcripts and Adapted Text Data"**

## Key Features

- **Transcription Pipeline**: High-performance audio-to-text conversion using Whisper and Faster-Whisper engines.
- **Text Preprocessing**: Advanced cleaning utilities including URL removal, symbol stripping, and whitespace normalization.
- **Domain-Specific NER**: Specialized Named Entity Recognition tailored for the psychology and mental health domain.
- **Redundancy Detection**: Automated detection and filtering of conversational redundancies.

## Technical Specifications

- **Frontend**: React 19 with Vite and Tailwind CSS.
- **Animation**: Motion (formerly Framer Motion).
- **AI/ML**: Google Generative AI (@google/genai) and Whisper-based transcription engines.
- **Icons**: Lucide React.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- FFmpeg (Required for audio processing)
- Python 3.8+ (If running transcription engines locally)

### Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
### Local Development

To start the development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

## License

Please refer to the LICENSE file for details on licensing and usage terms.
