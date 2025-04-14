# Rira Recruitment Test

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── shared/           # Shared components
│   │   ├── TextField.tsx # Reusable text input component
│   │   └── datePicker.tsx # Date picker component
│   ├── noteList/         # Note list related components
│   │   ├── NoteList.tsx  # Note list component
│   │   └── noteForm.tsx  # Note form component
│   └── providers/        # Context providers
│       └── NoteContext.tsx # Note state management
├── public/               # Static files
└── types/               # TypeScript type definitions
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building Project

### Build

```bash
npm run build
# or
yarn build
```

## Running Project

### Development

```bash
npm run dev
# or
yarn dev
```

### Production

```bash
npm run start
# or
yarn start
```

## Notes

- Task management with drag-and-drop functionality
- Persian calendar integration
- Form validation
- Responsive design
- TypeScript support
