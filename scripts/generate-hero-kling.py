from pathlib import Path
import json
import os
import time
import requests
import fal_client


ROOT = Path(__file__).resolve().parents[3]
PROJECT = Path(__file__).resolve().parents[1]
ENV_PATH = ROOT / ".env"
OUTPUT_DIR = ROOT / "Agente/_clients/divine-solutions/assets/generated-hero-video-2026-06-03"
PUBLIC_ASSETS = PROJECT / "public/assets"

START_FRAME_URL = "https://project-43vcj.vercel.app/assets/hero-scroll-frames/00-before.webp"
END_FRAME_URL = "https://project-43vcj.vercel.app/assets/hero-scroll-frames/03-supply-b.webp"

PROMPT = (
    "Premium futuristic construction supply hero video, 8 seconds, 16:9, high-end B2B construction brand. "
    "Start with a quiet incomplete construction site blueprint, empty resource pads and minimal logistics activity. "
    "Progressively activate the supply operation: materials, machinery, site infrastructure, logistics routes, "
    "documentation nodes and support resources appear in an elegant coordinated network. End aligned with the provided "
    "end frame: a complete construction supply system with teal blueprint routes and champagne logistics lines. "
    "Camera movement is slow and cinematic: subtle isometric dolly-in, slight parallax, no fast cuts, no shaky motion. "
    "Keep the left side visually calmer and darker for website headline overlay; keep important construction detail on "
    "center-right. Realistic premium industrial rendering, crisp detail, no text, no logos, no watermarks, no people "
    "faces, no distorted cranes, no melting geometry."
)


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
    os.environ["FAL_KEY"] = fal_key

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    arguments = {
        "image_url": START_FRAME_URL,
        "end_image_url": END_FRAME_URL,
        "prompt": PROMPT,
        "duration": "8",
        "generate_audio": False,
        "shot_type": "customize",
    }

    print("Submitting Kling O3 Pro image-to-video request...")
    handler = fal_client.submit("fal-ai/kling-video/o3/pro/image-to-video", arguments=arguments)
    print(f"REQUEST_ID={handler.request_id}")

    request_log = {
        "request_id": handler.request_id,
        "model": "fal-ai/kling-video/o3/pro/image-to-video",
        "arguments": arguments,
        "created_at": int(time.time()),
    }
    (OUTPUT_DIR / "request.json").write_text(json.dumps(request_log, indent=2), encoding="utf-8")

    for event in handler.iter_events(with_logs=True):
        print(f"EVENT={type(event).__name__}")

    result = handler.get()
    (OUTPUT_DIR / "result.json").write_text(json.dumps(result, indent=2), encoding="utf-8")

    video_url = result.get("video", {}).get("url") or result.get("url")
    if not video_url:
        raise SystemExit("No video URL in fal result.")

    video = requests.get(video_url, timeout=180)
    video.raise_for_status()

    client_output = OUTPUT_DIR / "hero-kling-o3-pro-8s.mp4"
    project_output = PUBLIC_ASSETS / "hero-kling-o3-pro-8s.mp4"
    client_output.write_bytes(video.content)
    project_output.write_bytes(video.content)

    print(f"SAVED_CLIENT={client_output}")
    print(f"SAVED_PROJECT={project_output}")
    print(f"SIZE_MB={round(project_output.stat().st_size / 1024 / 1024, 2)}")


if __name__ == "__main__":
    main()
