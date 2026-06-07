const RELEASES_JSON = 'data/releases.json';

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '—';
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatShortDate(isoDate) {
  if (!isoDate) return '—';
  const date = new Date(isoDate);
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short' });
}

async function fetchReleases() {
  const response = await fetch(RELEASES_JSON);
  if (!response.ok) throw new Error('No se pudo cargar el historial de versiones');
  return response.json();
}

function getLatestRelease(data) {
  return data.releases.find((r) => r.version === data.latest) || data.releases[0];
}

function renderDownloadSection(data) {
  const latest = getLatestRelease(data);
  if (!latest) return;

  const versionEls = document.querySelectorAll('[data-release-version]');
  versionEls.forEach((el) => {
    el.textContent = `${latest.version}-beta`;
  });

  const dateEls = document.querySelectorAll('[data-release-date]');
  dateEls.forEach((el) => {
    el.textContent = formatShortDate(latest.date);
  });

  const sizeEls = document.querySelectorAll('[data-release-size]');
  sizeEls.forEach((el) => {
    el.textContent = formatBytes(latest.sizeBytes);
  });

  const androidEls = document.querySelectorAll('[data-release-android]');
  androidEls.forEach((el) => {
    el.textContent = `${latest.minAndroid}+`;
  });

  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.href = latest.apk;
    downloadBtn.addEventListener('click', () => {
      trackEvent('apk_download', { version: `${latest.version}-beta` });
    });
  }

  const footerApkLink = document.getElementById('footer-apk-link');
  if (footerApkLink) {
    footerApkLink.href = latest.apk;
    footerApkLink.textContent = `Android — Beta v${latest.version}`;
  }

  const footerVersion = document.getElementById('footer-version');
  if (footerVersion) {
    footerVersion.textContent = `Beta v${latest.version}`;
  }

  const changelogTag = document.getElementById('changelog-version-tag');
  if (changelogTag) {
    changelogTag.textContent = `v${latest.version}-beta`;
  }

  const changelogItems = document.getElementById('changelog-items');
  if (changelogItems) {
    changelogItems.innerHTML = latest.changelog
      .map(
        (item) => `
        <div class="changelog-item">
          <p>${escapeHtml(item)}</p>
        </div>`
      )
      .join('');
  }
}

function renderReleasesPage(data) {
  const container = document.getElementById('release-list');
  if (!container) return;

  container.innerHTML = data.releases
    .map((release) => {
      const isLatest = release.version === data.latest;
      const changelogHtml = release.changelog
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('');

      return `
        <article class="release-card${isLatest ? ' latest' : ''}">
          <div class="release-card-header">
            <div class="release-card-title">
              <h2>v${escapeHtml(release.version)}-beta</h2>
              ${isLatest ? '<span class="release-badge">Actual</span>' : ''}
            </div>
            <div class="release-meta">
              <span><i class="fas fa-calendar"></i> ${formatDate(release.date)}</span>
              <span><i class="fas fa-weight-hanging"></i> ${formatBytes(release.sizeBytes)}</span>
              <span><i class="fab fa-android"></i> Android ${release.minAndroid}+</span>
            </div>
          </div>
          <div class="release-card-body">
            <ul class="release-changelog">${changelogHtml}</ul>
            <a href="${release.apk}" class="btn-download-small" download
               data-version="${release.version}">
              <i class="fas fa-download"></i> Descargar APK
            </a>
          </div>
        </article>`;
    })
    .join('');

  container.querySelectorAll('.btn-download-small').forEach((btn) => {
    btn.addEventListener('click', () => {
      trackEvent('apk_download', {
        version: `${btn.dataset.version}-beta`,
        page: 'versiones',
      });
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function initReleases() {
  try {
    const data = await fetchReleases();
    renderDownloadSection(data);
    renderReleasesPage(data);
  } catch (error) {
    console.warn('Releases:', error.message);
  }
}
