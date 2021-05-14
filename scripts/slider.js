const priceSlider = document.getElementById("discount-card__slider");
const priceTag = document.getElementById("discount-card__price-tag");
const pageViewsText = document.getElementById("discount-card__view-count");
const billingToggle = document.getElementById("discount-card__billing-toggle");

const style = window.getComputedStyle(priceSlider);
const lightGrayishBlue1 = style.getPropertyValue("--light-grayish-blue1");
const lightGrayishBlue2 = style.getPropertyValue("--light-grayish-blue2");
const softCyan = style.getPropertyValue("--soft-cyan");

let isDiscountOn = false;

priceSlider.addEventListener("mousemove", (event) => {
  const gradientStop =
    ((event.target.value - priceSlider.min) /
      (priceSlider.max - priceSlider.min)) *
    100;

  priceSlider.style.backgroundImage = `linear-gradient(to right, ${softCyan} ${gradientStop}%, ${lightGrayishBlue1} ${gradientStop}%)`;

  updatePrice();
});

billingToggle.addEventListener("click", (event) => {
  const isOn = event.target.value === "1";

  isDiscountOn = isOn;

  billingToggle.style.backgroundColor = isOn ? softCyan : lightGrayishBlue2;

  updatePrice();
});

const updatePrice = () => {
  const { basePrice, pageviews } = PRICE_MODELS[priceSlider.value];

  const finalPrice = getDiscountValue(basePrice, isDiscountOn ? DISCOUNT : 0);
  priceTag.textContent = formatCurrency(finalPrice);
  pageViewsText.textContent = pageviews + " Pageviews";
};

//helper functrons
const formatCurrency = (value, options) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
};

const getDiscountValue = (baseValue, discount) => {
  return baseValue - baseValue * discount;
};
