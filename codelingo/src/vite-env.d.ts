/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MSW: string
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}