export function DimesionMatch({ dimension, userVal, min, max, matched }) {
  return `
      <div class="flex justify-between items-center py-1">
        <div id="traitLabel" class="text-sm">${dimension}</div>
        <div class="text-sm font-medium ${matched? 'text-green-600' : 'text-gray-700'}">
          ${userVal}%
          <span class="text-xs text-gray-400">(${min}-${max}%)</span>
        </div>
      </div>
  `;
}

export function Profile({ profileName, profileDesc, totalMatches, dimensions }) {

  const dimensionRows = dimensions.map(dim => 
    DimesionMatch({
      dimension: dim.label,
      userVal: dim.userVal,
      min: dim.min,
      max: dim.max,
      matched: dim.matched
    })
  ).join('');

  return `
    <div class="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 shadow-sm">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-xs text-gray-500">Perfil sugerido</div>
          <div class="text-lg font-bold">${profileName}</div>
          <div class="text-sm text-gray-600 mt-2">${profileDesc}</div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Coincidencias</div>
          <div class="text-2xl font-semibold text-indigo-600">${totalMatches} / 5</div>
        </div>
      </div>
      <div class="mt-4 border-t pt-3">${dimensionRows}</div>
    </div>
  `;
}