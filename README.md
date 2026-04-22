# VitalRange

AI-powered lab report biomarker extraction tool. Upload PDF lab reports and extract structured biomarker data using OpenAI.

## Features

- **PDF Upload**: Drag & drop multiple lab report PDFs at once
- **AI Extraction**: Uses OpenAI to extract every biomarker from every page
- **Standardized Output**: Names and units normalized to English clinical conventions
- **Age & Sex Aware**: Classifies results as optimal, normal, or out of range based on patient demographics
- **Search & Filter**: Search biomarkers by name, unit, or filter by status
- **Patient Information**: Extracts and displays patient details
- **Status Summary**: Visual overview of biomarker status distribution

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **AI**: OpenAI API
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20 or higher
- OpenAI API key

### Installation

1. Clone the repository and navigate to the project directory:
```bash
cd vital-range
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `OPENAI_API_KEY` (required): Your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
- `OPENAI_MODEL` (optional): OpenAI model to use (defaults to `gpt-4o-mini`)

## Project Structure

```
vital-range/
├── app/
│   ├── api/extract/       # API route for biomarker extraction
│   ├── components/        # React components
│   │   ├── file-dropzone.tsx
│   │   ├── biomarker-table.tsx
│   │   ├── status-badge.tsx
│   │   ├── patient-info-card.tsx
│   │   ├── report-result.tsx
│   │   └── status-summary.tsx
│   ├── constants/         # Configuration constants
│   ├── enums/            # TypeScript enums
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── page.tsx          # Main page
├── components/ui/        # shadcn/ui components
└── lib/                  # shadcn utilities
```

## API Endpoints

### POST /api/extract

Extract biomarkers from uploaded PDF files.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: FormData with `files` field containing PDF files

**Response:**
```json
{
  "results": [
    {
      "fileName": "lab-report.pdf",
      "data": {
        "patient": {
          "name": "John Doe",
          "age": 45,
          "sex": "male",
          "collection_date": "2024-01-15"
        },
        "biomarkers": [
          {
            "name": "Hemoglobin",
            "value": 14.5,
            "unit": "g/dL",
            "reference_range": "13.5-17.5",
            "status": "normal",
            "explanation": "Within normal range"
          }
        ]
      }
    }
  ]
}
```

## License

This project is for informational purposes only and is not a substitute for professional medical advice.
