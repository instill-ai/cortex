// The dependency will look like
// "[*aa793287-26b2-470f-8436-9643b096a9ce.images,*5ff2a451-829d-47df-baae-82ac919d90fc.images]"
// We need to parse it to get the dependency array
// ["aa793287-26b2-470f-8436-9643b096a9ce.images", "5ff2a451-829d-47df-baae-82ac919d90fc.images"]

export function parseDependencyComponents(string: string) {
  const dependencies = string
    .replaceAll("[", "")
    .replaceAll("]", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("**", "")
    .replaceAll("*", "")
    .split(",")
    .filter((e) => e !== "");

  return dependencies;
}
