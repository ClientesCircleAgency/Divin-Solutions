from pathlib import Path
import os
import requests


ROOT = Path(__file__).resolve().parents[3]
ENV_PATH = ROOT / ".env"


def load_env(path: Path) -> None:
    if not path.exists():
        raise SystemExit(f"Missing env file: {path}")

    for line in path.read_text(encoding="utf-8", errors="ignore").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ[key.strip()] = value.strip().strip("\"'")


def main() -> None:
    load_env(ENV_PATH)
    fal_key = os.environ.get("FAL_KEY") or os.environ.get("FAL_API_KEY")
    if not fal_key:
        raise SystemExit("FAL_KEY or FAL_API_KEY is missing in root .env")

    response = requests.post(
        "https://queue.fal.run/fal-ai/kling-video/o3/pro/image-to-video",
        headers={"Authorization": f"Key {fal_key}", "Content-Type": "application/json"},
        json={},
        timeout=30,
    )

    if response.status_code == 422:
        print("fal.ai auth OK. Queue endpoint accepted the key and rejected the empty test payload as expected.")
        return

    print(f"fal.ai status: {response.status_code}")
    print(response.text)


if __name__ == "__main__":
    main()
