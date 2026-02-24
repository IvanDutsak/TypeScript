
console.log("╔══════════════════════════════════════════════════════════╗");
console.log("║          🔺  РОЗВ'ЯЗАННЯ ПРЯМОКУТНОГО ТРИКУТНИКА         ║");
console.log("╠══════════════════════════════════════════════════════════╣");
console.log("║  Використання: triangle(value1, type1, value2, type2)    ║");
console.log("║                                                          ║");
console.log("║  Допустимі типи (type):                                  ║");
console.log("║   'leg'            — катет (a або b)                     ║");
console.log("║   'hypotenuse'     — гіпотенуза (c)                      ║");
console.log("║   'adjacent angle' — кут, прилеглий до катета (градуси)  ║");
console.log("║   'opposite angle' — кут, протилежний катету (градуси)   ║");
console.log("║   'angle'          — гострий кут (тільки з hypotenuse)   ║");
console.log("║                                                          ║");
console.log("║  Допустимі комбінації:                                   ║");
console.log("║   (leg, leg)           (leg, hypotenuse)                 ║");
console.log("║   (leg, adjacent angle)(leg, opposite angle)             ║");
console.log("║   (hypotenuse, angle)                                    ║");
console.log("║                                                          ║");
console.log("║  Приклад: triangle(3, 'leg', 4, 'leg')                   ║");
console.log("╚══════════════════════════════════════════════════════════╝");

function triangle(
  value1: number,
  type1: string,
  value2: number,
  type2: string
): string {

  const validTypes: string[] = [
    "leg",
    "hypotenuse",
    "adjacent angle",
    "opposite angle",
    "angle",
  ];

  const toRad = (deg: number): number => (deg * Math.PI) / 180;
  const toDeg = (rad: number): number => (rad * 180) / Math.PI;

  const round = (n: number): number => Math.round(n * 10000) / 10000;

  if (!validTypes.includes(type1)) {
    console.error(
      `❌ Невідомий тип: '${type1}'.\n   Допустимі типи: ${validTypes.join(", ")}`
    );
    return "failed";
  }
  if (!validTypes.includes(type2)) {
    console.error(
      `❌ Невідомий тип: '${type2}'.\n   Допустимі типи: ${validTypes.join(", ")}`
    );
    return "failed";
  }

  let a: number = 0; // катет a
  let b: number = 0; // катет b
  let c: number = 0; // гіпотенуза
  let alpha: number = 0; // кут α (протилежний до катета a), градуси
  let beta: number  = 0; // кут β (протилежний до катета b), градуси


  if (type1 === "leg" && type2 === "leg") {
    if (value1 <= 0 || value2 <= 0) {
      return `❌ Помилка: катети мають бути додатними числами. Отримано a=${value1}, b=${value2}`;
    }
    a = value1;
    b = value2;
    c = Math.sqrt(a * a + b * b);
    alpha = toDeg(Math.atan(a / b));
    beta  = toDeg(Math.atan(b / a));
  }

  else if (
    (type1 === "leg" && type2 === "hypotenuse") ||
    (type1 === "hypotenuse" && type2 === "leg")
  ) {
    const leg: number = type1 === "leg" ? value1 : value2;
    const hyp: number = type1 === "hypotenuse" ? value1 : value2;

    if (leg <= 0)
      return `❌ Помилка: катет має бути додатним числом. Отримано ${leg}`;
    if (hyp <= 0)
      return `❌ Помилка: гіпотенуза має бути додатним числом. Отримано ${hyp}`;
    if (leg >= hyp)
      return `❌ Помилка: катет (${leg}) має бути строго меншим за гіпотенузу (${hyp})`;

    a     = leg;
    c     = hyp;
    b     = Math.sqrt(c * c - a * a);
    alpha = toDeg(Math.asin(a / c));
    beta  = toDeg(Math.asin(b / c));
  }

  else if (
    (type1 === "leg" && type2 === "adjacent angle") ||
    (type1 === "adjacent angle" && type2 === "leg")
  ) {
    const leg: number = type1 === "leg" ? value1 : value2;
    const ang: number = type1 === "adjacent angle" ? value1 : value2;

    if (leg <= 0)
      return `❌ Помилка: катет має бути додатним числом. Отримано ${leg}`;
    if (ang <= 0 || ang >= 90)
      return `❌ Помилка: кут має бути в межах (0°; 90°). Отримано ${ang}°`;

    a     = leg;
    alpha = ang;
    beta  = 90 - alpha;
    // tan(α) = a/b  →  b = a / tan(α)
    b = a / Math.tan(toRad(alpha));
    // sin(α) = a/c  →  c = a / sin(α)
    c = a / Math.sin(toRad(alpha));
  }

  else if (
    (type1 === "leg" && type2 === "opposite angle") ||
    (type1 === "opposite angle" && type2 === "leg")
  ) {
    const leg: number = type1 === "leg" ? value1 : value2;
    const ang: number = type1 === "opposite angle" ? value1 : value2;

    if (leg <= 0)
      return `❌ Помилка: катет має бути додатним числом. Отримано ${leg}`;
    if (ang <= 0 || ang >= 90)
      return `❌ Помилка: кут має бути в межах (0°; 90°). Отримано ${ang}°`;

    a     = leg;
    beta  = ang;
    alpha = 90 - beta;
    // cos(β) = a/c  →  c = a / cos(β)
    c = a / Math.cos(toRad(beta));
    // tan(β) = b/a  →  b = a * tan(β)
    b = a * Math.tan(toRad(beta));
  }

  else if (
    (type1 === "hypotenuse" && type2 === "angle") ||
    (type1 === "angle" && type2 === "hypotenuse")
  ) {
    const hyp: number = type1 === "hypotenuse" ? value1 : value2;
    const ang: number = type1 === "angle" ? value1 : value2;

    if (hyp <= 0)
      return `❌ Помилка: гіпотенуза має бути додатним числом. Отримано ${hyp}`;
    if (ang <= 0 || ang >= 90)
      return `❌ Помилка: кут має бути в межах (0°; 90°). Отримано ${ang}°`;

    c     = hyp;
    alpha = ang;
    beta  = 90 - alpha;
    // sin(α) = a/c  →  a = c * sin(α)
    a = c * Math.sin(toRad(alpha));
    // cos(α) = b/c  →  b = c * cos(α)
    b = c * Math.cos(toRad(alpha));
  }

  else {
    console.error(`❌ Несумісна комбінація типів: '${type1}' та '${type2}'.`);
    console.log(
      "   Допустимі комбінації: (leg, leg), (leg, hypotenuse),\n" +
      "   (leg, adjacent angle), (leg, opposite angle), (hypotenuse, angle)"
    );
    return "failed";
  }

  console.log("┌─────────────────────────────────────────┐");
  console.log("│       Розв'язання прямокутного трикутника│");
  console.log("├─────────────────────────────────────────┤");
  console.log(`│  a (катет)        = ${round(a)}`);
  console.log(`│  b (катет)        = ${round(b)}`);
  console.log(`│  c (гіпотенуза)   = ${round(c)}`);
  console.log(`│  α (alpha)        = ${round(alpha)}°`);
  console.log(`│  β (beta)         = ${round(beta)}°`);
  console.log("└─────────────────────────────────────────┘");

  return "success";
}


// ════════════════════════════════════════════════════════════
//  Тестові виклики
// ════════════════════════════════════════════════════════════

console.log("\n📌 Тест 1 — два катети: triangle(3, 'leg', 4, 'leg')");
console.log("Результат:", triangle(3, "leg", 4, "leg"));
// Очікується: a=3, b=4, c=5, α≈36.87°, β≈53.13°

console.log("\n📌 Тест 2 — катет + гіпотенуза: triangle(4, 'leg', 8, 'hypotenuse')");
console.log("Результат:", triangle(4, "leg", 8, "hypotenuse"));
// Очікується: a=4, b≈6.9282, c=8, α=30°, β=60°

console.log("\n📌 Тест 3 — гіпотенуза + катет (обернений порядок): triangle(8, 'hypotenuse', 4, 'leg')");
console.log("Результат:", triangle(8, "hypotenuse", 4, "leg"));

console.log("\n📌 Тест 4 — катет + прилеглий кут: triangle(5, 'leg', 30, 'adjacent angle')");
console.log("Результат:", triangle(5, "leg", 30, "adjacent angle"));
// Очікується: a=5, b≈8.6603, c=10, α=30°, β=60°

console.log("\n📌 Тест 5 — катет + протилежний кут: triangle(5, 'leg', 45, 'opposite angle')");
console.log("Результат:", triangle(5, "leg", 45, "opposite angle"));
// Очікується: a=5, b=5, c≈7.0711, α=45°, β=45°

console.log("\n📌 Тест 6 — гіпотенуза + кут: triangle(10, 'hypotenuse', 30, 'angle')");
console.log("Результат:", triangle(10, "hypotenuse", 30, "angle"));
// Очікується: a=5, b≈8.6603, c=10, α=30°, β=60°

// ─── Тести на помилки ───

console.log("\n⚠️  Тест 7 — катет >= гіпотенуза: triangle(5, 'leg', 3, 'hypotenuse')");
console.log("Результат:", triangle(5, "leg", 3, "hypotenuse"));

console.log("\n⚠️  Тест 8 — від'ємне значення: triangle(-3, 'leg', 4, 'leg')");
console.log("Результат:", triangle(-3, "leg", 4, "leg"));

console.log("\n⚠️  Тест 9 — друкарська помилка у типі: triangle(5, 'leg', 3, 'hypotenus')");
console.log("Результат:", triangle(5, "leg", 3, "hypotenus"));

console.log("\n⚠️  Тест 10 — несумісна комбінація: triangle(5, 'hypotenuse', 30, 'adjacent angle')");
console.log("Результат:", triangle(5, "hypotenuse", 30, "adjacent angle"));

console.log("\n⚠️  Тест 11 — кут >= 90°: triangle(5, 'leg', 95, 'adjacent angle')");
console.log("Результат:", triangle(5, "leg", 95, "adjacent angle"));
