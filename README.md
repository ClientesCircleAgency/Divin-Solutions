# Divin Solutions

Premium one-page website for Divin Solutions, focused on construction supply, site resources, logistics, documentation and operational support.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Backup & Recovery

The project is backed up through GitHub and Vercel:

- GitHub stores the full source history and recoverable commits.
- Vercel stores deployment history and can roll back to previous production deployments.
- Final website assets are versioned in `public/assets`.
- Sensitive files such as `.env` and `.env.*` are ignored and must not be committed.

To restore locally:

```bash
git clone https://github.com/ClientesCircleAgency/Divin-Solutions.git
cd Divin-Solutions
npm install
npm run build
```
