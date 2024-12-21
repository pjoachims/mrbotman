---
layout: hash.njk
---
<div class="min-h-screen bg-gray-100">
 <div class="container mx-auto p-4 sm:p-8 max-w-2xl">
   <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
     <h1 class="text-3xl sm:text-4xl font-bold text-center">Hash Generator</h1>
     
     <table class="w-full table-fixed mt-6 sm:mt-8">
       <colgroup>
         <col class="w-20 sm:w-24">
         <col class="w-auto">
         <col class="w-16 sm:w-20">
       </colgroup>
       <tbody>
         <tr class="border-b">
           <td class="py-3 sm:py-4 pr-4">
             <label class="text-base sm:text-lg text-gray-700" for="salt">salt</label>
           </td>
           <td class="py-3 sm:py-4">
             <input type="password" id="salt" class="w-full p-1.5 sm:p-2 border rounded text-sm sm:text-base">
           </td>
           <td class="py-3 sm:py-4 pl-4">
             <button onclick="toggleSaltVisibility()" class="p-1 bg-gray-100 rounded border">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684L22.054 12l-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
              </svg>
             </button>
           </td>
         </tr>

         <tr class="border-b">
           <td class="py-3 sm:py-4 pr-4">
             <label class="text-base sm:text-lg text-gray-700" for="service">string</label>
           </td>
           <td class="py-3 sm:py-4">
             <input type="text" id="service" class="w-full p-1.5 sm:p-2 border rounded text-sm sm:text-base">
           </td>
           <td></td>
         </tr>

         <tr class="border-b">
           <td class="py-3 sm:py-4 pr-4">
             <label class="text-base sm:text-lg text-gray-700">output</label>
           </td>
           <td class="py-3 sm:py-4">
             <textarea id="hash" class="w-full p-1.5 sm:p-2 bg-gray-50 rounded font-mono blur hash-text resize-y min-h-[40px] text-sm sm:text-base" readonly></textarea>
           </td>
           <td class="py-3 sm:py-4 pl-4">
             <div class="flex space-x-2">
             <button onclick="toggleHashVisibility()" class="p-1 bg-gray-100 rounded border">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684L22.054 12l-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
              </svg>
             </button>
               <button onclick="copyHash()" class="p-1 bg-gray-100 rounded border">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                   <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                 </svg>
               </button>
             </div>
           </td>
         </tr>

         <tr class="border-b">
           <td class="py-3 sm:py-4 pr-4">
             <label class="text-base sm:text-lg text-gray-700" for="specialChars">special chars</label>
           </td>
           <td class="py-3 sm:py-4">
             <input type="text" id="specialChars" value="!@#$%^&*+" class="w-full p-1.5 sm:p-2 border rounded text-sm sm:text-base" placeholder="Enter special characters">
           </td>
           <td class="py-3 sm:py-4">
             <input type="number" id="numSpecialChars" min="0" max="4" value="0" class="w-16 p-1.5 sm:p-2 border rounded text-sm sm:text-base" oninput="generateHash()">
           </td>
         </tr>

         <tr>
           <td class="py-3 sm:py-4 pr-4">
             <label class="text-base sm:text-lg text-gray-700" for="length">length</label>
           </td>
           <td class="py-3 sm:py-4">
             <div class="flex items-center gap-2 sm:gap-4">
               <input type="number" id="minLength" value="1" min="1" class="w-16 sm:w-20 p-1.5 sm:p-2 border rounded text-sm sm:text-base" oninput="updateLength()">
               <span class="text-gray-400">to</span>
               <input type="number" id="maxLength" value="64" min="1" class="w-16 sm:w-20 p-1.5 sm:p-2 border rounded text-sm sm:text-base" oninput="updateLength()">
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
document.getElementById('specialChars').addEventListener('input', generateHash);
document.getElementById('numSpecialChars').addEventListener('input', generateHash);

function toggleSaltVisibility() {
 const saltInput = document.getElementById('salt');
 saltInput.type = saltInput.type === 'password' ? 'text' : 'password';
}

function toggleHashVisibility() {
 const hashElement = document.getElementById('hash');
 hashElement.classList.toggle('blur');
}

function generateHash() {
 const salt = document.getElementById('salt').value;
 const service = document.getElementById('service').value;
 const minInput = document.getElementById('minLength');
 const maxInput = document.getElementById('maxLength');
 
 const min = minInput.value === '' ? 1 : parseInt(minInput.value);
 const max = maxInput.value === '' ? 64 : parseInt(maxInput.value);
 
 let fullHash = sha256(`${salt}_${service}`);
 
 // Generate special characters prefix
 const numSpecialChars = document.getElementById('numSpecialChars').value;
 const specialCharsInput = document.getElementById('specialChars').value;
 const specialCharsOptions = specialCharsInput.split('').filter(char => char.trim() !== '');
 let specialPrefix = '';
 
 if (numSpecialChars > 0 && specialCharsOptions.length > 0) {
   const saltHash = sha256(salt);
   for (let i = 0; i < numSpecialChars; i++) {
     // Use segments of the salt hash to select special characters
     const charIndex = parseInt(saltHash.substr(i * 2, 2), 16) % specialCharsOptions.length;
     specialPrefix += specialCharsOptions[charIndex];
   }
 }
 
 let hash = fullHash.substring(min - 1, max);
 document.getElementById('hash').value = specialPrefix + hash;
}

function copyHash() {
 const hash = document.getElementById('hash').value;
 navigator.clipboard.writeText(hash);
 
 const copyIcon = document.querySelector('button[onclick="copyHash()"] svg');
 const currentPath = copyIcon.innerHTML;
 
 copyIcon.innerHTML = '<polyline points="20 6 9 17 4 12"/>';
 
 setTimeout(() => {
   copyIcon.innerHTML = currentPath;
 }, 1000);
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