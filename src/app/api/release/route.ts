import { NextResponse } from "next/server";

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  assets: GitHubAsset[];
}

const REPO = "Chrispsz/naruto-online-launcher";

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "NarutoOnlineLauncher",
        },
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const release: GitHubRelease = await response.json();

    const linuxAsset = release.assets.find((a) =>
      a.name.toLowerCase().includes("linux")
    );
    const windowsAsset = release.assets.find((a) =>
      a.name.toLowerCase().includes("win")
    );

    const totalDownloads = release.assets.reduce(
      (sum, a) => sum + a.download_count,
      0
    );

    const formatSize = (bytes: number) => {
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return NextResponse.json({
      version: release.tag_name,
      name: release.name,
      publishedAt: release.published_at,
      htmlUrl: release.html_url,
      body: release.body || "",
      downloads: {
        linux: linuxAsset
          ? {
              url: linuxAsset.browser_download_url,
              size: linuxAsset.size,
              downloads: linuxAsset.download_count,
            }
          : null,
        windows: windowsAsset
          ? {
              url: windowsAsset.browser_download_url,
              size: windowsAsset.size,
              downloads: windowsAsset.download_count,
            }
          : null,
      },
      totalDownloads,
      formattedSize: {
        linux: linuxAsset ? formatSize(linuxAsset.size) : null,
        windows: windowsAsset ? formatSize(windowsAsset.size) : null,
      },
    });
  } catch (error) {
    console.error("Failed to fetch release info:", error);
    return NextResponse.json(
      {
        version: "v1.4.0",
        name: "Naruto Online Launcher v1.4.0",
        publishedAt: "2025-01-01T00:00:00Z",
        htmlUrl: `https://github.com/${REPO}/releases/latest`,
        body: "## v1.4.0\n\n- AppImage extraído automaticamente na instalação (sem FUSE)\n- Inicialização mais rápida sem montagem FUSE\n- var → const/let em todos os arquivos\n- Scripts de instalação melhorados",
        downloads: {
          linux: {
            url: `https://github.com/${REPO}/releases/latest/download/naruto-online-linux.zip`,
            size: 0,
            downloads: 0,
          },
          windows: {
            url: `https://github.com/${REPO}/releases/latest/download/naruto-online-win.zip`,
            size: 0,
            downloads: 0,
          },
        },
        totalDownloads: 0,
        formattedSize: { linux: null, windows: null },
        fallback: true,
      },
      { status: 200 }
    );
  }
}
