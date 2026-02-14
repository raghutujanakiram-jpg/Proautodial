# ProAutoDial AI Suite

This is the ProAutoDial AI Suite application, a comprehensive platform for intelligent communication.

## 🚀 Deployment to Vercel

This project is configured for seamless deployment on Vercel.

### Steps to Deploy

1.  **Import Project**:
    *   Go to your Vercel Dashboard and click "Add New... > Project".
    *   Select your Git repository.

2.  **Configure Project Settings**:
    *   **Root Directory**: You **MUST** set the Root Directory to `repo`.
        *   (Vercel will ask this during import, or you can change it in Settings > General).
    *   **Framework Preset**: Vercel should automatically detect `Vite`.

3.  **Environment Variables**:
    *   Go to the "Environment Variables" section.
    *   Add the following keys (copy values from your local `.env`):
        *   `GEMINI_API_KEY`
        *   `VITE_RINGG_API_KEY`
        *   `VITE_ELEVENLABS_API_KEY`

4.  **Deploy**:
    *   Click **Deploy**.

### Configuration Details

*   **`vercel.json`**: A `vercel.json` file is included in the `repo` directory to handle:
    *   **API Proxies**: Requests to `/ringg-api/*` and `/elevenlabs-api/*` are securely proxied to their respective upstream services, avoiding CORS issues.
    *   **SPA Routing**: All other routes are rewritten to `/index.html` to support React Router.

## 💻 Run Locally

**Prerequisites:** Node.js (v18+ recommended)

1.  Navigate to the `repo` directory:
    ```bash
    cd repo
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up Environment Variables:
    *   Create a `.env` file (copy from `.env.example`).
    *   Add your API keys.

4.  Run the development server:
    ```bash
    npm run dev
    ```

## 🛠️ Build for Production

To create a production build locally:

```bash
npm run build
```
The output will be in the `dist` folder.
