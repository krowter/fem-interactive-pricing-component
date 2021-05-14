const slider = document.getElementById("discount-card__slider");
const priceTag = document.getElementById("discount-card__price-tag");

const style = window.getComputedStyle(slider);
const lightGrayishBlue = style.getPropertyValue("--light-grayish-blue");
const softCyan = style.getPropertyValue("--soft-cyan");

slider.addEventListener("mousemove", (event) => {
  const gradientStop =
    ((event.target.value - slider.min) / (slider.max - slider.min)) * 100;

  slider.style.backgroundImage = `linear-gradient(to right, ${softCyan} ${gradientStop}%, ${lightGrayishBlue} ${gradientStop}%)`;

  priceTag.textContent = formatCurrency(event.target.value);
});

//helper functions
const formatCurrency = (value, options) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
};
