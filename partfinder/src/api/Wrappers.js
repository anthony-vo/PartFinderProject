const BASE_URL = "/api.php";

export async function fetchMakes() {
  const result = await fetch(`${BASE_URL}/makes?q=makes`);
  return result.json();
}

export async function fetchModels(make) {
  const result = await fetch(
    `${BASE_URL}/models?q=models&make=${encodeURIComponent(make)}`
  );
  return result.json();
}

export async function fetchTypes(make, model) {
  const result = await fetch(
    `${BASE_URL}/types?q=types&make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}`
  );
  return result.json();
}

export async function fetchParts(make, model, type) {
  const result = await fetch(
    `${BASE_URL}/parts?q=parts&make=${encodeURIComponent(
      make
    )}&model=${encodeURIComponent(model)}&type=${encodeURIComponent(type)}`
  );
  return result.json();
}
