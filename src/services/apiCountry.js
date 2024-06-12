const URL_COUNTRY = "https://flagcdn.com/en/codes.json";

export async function getCountries() {
  const res = await fetch(URL_COUNTRY);

  const data = await res.json();

  return data;
}
