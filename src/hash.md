---
layout: base.njk
permalink: /hash/index.html
---
<div class="min-h-screen bg-gray-100">
  <div class="container mx-auto p-8 max-w-2xl">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Hash Generator</h1>

      <table class="w-full table-fixed">
        <colgroup>
          <col class="w-24">
          <col class="w-auto">
          <col class="w-20">
        </colgroup>
        <tbody>
          <tr class="border-b">
            <td class="py-4 pr-4">
              <label class="text-gray-700" for="salt">salt</label>
            </td>
            <td class="py-4">
              <input type="password" id="salt" class="w-full p-2 border rounded">
            </td>
            <td class="py-4 pl-4">
              <button onclick="toggleVisibility('salt')" class="text-gray-500 hover:text-gray-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </td>
          </tr>

          <tr class="border-b">
            <td class="py-4 pr-4">
              <label class="text-gray-700" for="service">string</label>
            </td>
            <td class="py-4">
              <input type="text" id="service" class="w-full p-2 border rounded">
            </td>
            <td></td>
          </tr>

          <tr class="border-b">
            <td class="py-4 pr-4">
              <label class="text-gray-700">output</label>
            </td>
            <td class="py-4">
              <textarea id="hash" class="w-full p-2 bg-gray-50 rounded font-mono blur hash-text resize-y min-h-[40px]" readonly></textarea>
            </td>
            <td class="py-4 pl-4">
              <div class="flex space-x-2">
                <button onclick="toggleVisibility('hash')" class="text-gray-500 hover:text-gray-700">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                <button onclick="copyHash()" class="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200">
                  <svg id="copyIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                  </svg>
                  <span class="ml-2">Copy</span>
                </button>
              </div>
            </td>
          </tr>

          <tr>
            <td class="py-4 pr-4">
              <label class="text-gray-700" for="length">length</label>
            </td>
            <td class="py-4">
              <div class="flex items-center gap-4">
                <input type="number" id="minLength" value="1" min="1" max="64" class="w-20 p-2 border rounded" oninput="updateLength()">
                <span class="text-gray-400">to</span>
                <input type="number" id="maxLength" value="64" min="1" max="64" class="w-20 p-2 border rounded" oninput="updateLength()">
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
.hash-text.blur {
  filter: blur(4px);
}
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha256/0.9.0/sha256.min.js"></script>
<script>
document.getElementById('salt').addEventListener('input', generateHash);
document.getElementById('service').addEventListener('input', generateHash);

function generateHash() {
  const salt = document.getElementById('salt').value;
  const service = document.getElementById('service').value;
  const minInput = document.getElementById('minLength');
  const maxInput = document.getElementById('maxLength');
  
  const min = minInput.value === '' ? 1 : parseInt(minInput.value);
  const max = maxInput.value === '' ? 64 : parseInt(maxInput.value);
  
  let fullHash = '';
  for(let i = 0; i < Math.ceil(max / 64); i++) {
    fullHash += sha256(`${salt}_${service}_${i}`);
  }
  
  let hash = fullHash.substring(min - 1, max);
  document.getElementById('hash').value = hash;
}

function copyHash() {
  const hash = document.getElementById('hash').value;
  navigator.clipboard.writeText(hash);
  
  const copyIcon = document.getElementById('copyIcon');
  const currentPath = copyIcon.innerHTML;
  
  copyIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  
  setTimeout(() => {
    copyIcon.innerHTML = currentPath;
  }, 1000);
}

function toggleVisibility(id) {
  const element = document.getElementById(id);
  if (id === 'salt') {
    element.type = element.type === 'password' ? 'text' : 'password';
  } else {
    element.classList.toggle('blur');
  }
}

function updateLength() {
  const minInput = document.getElementById('minLength');
  const maxInput = document.getElementById('maxLength');
  
  const min = minInput.value === '' ? 1 : parseInt(minInput.value);
  const max = maxInput.value === '' ? 64 : parseInt(maxInput.value);
  
  if (minInput.value !== '') minInput.value = Math.min(min, max);
  if (maxInput.value !== '') maxInput.value = Math.max(min, max);
  
  generateHash();
}

generateHash();
</script>