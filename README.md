# portfolio-site
Marketing and portfolio site built in React Router powering mitchellmartinez.tech

## Deployment

- GitHub Actions deploy workflow: `.github/workflows/deploy.yml`
- Container build file: `Dockerfile`
- Recommended server routing (on VPS Caddy):

```caddyfile
mitchellmartinez.tech {
  reverse_proxy 127.0.0.1:3000
}
```
