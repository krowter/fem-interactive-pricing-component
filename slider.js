const priceModels = {
  1: {
    basePrice: 8,
    pageviews: "10K",
  },
  2: {
    basePrice: 12,
    pageviews: "50K",
  },
  3: {
    basePrice: 16,
    pageviews: "100K",
  },
  4: {
    basePrice: 24,
    pageviews: "500K",
  },
  5: {
    basePrice: 36,
    pageviews: "1M",
  },
};

const slider = document.getElementById("discount-card__slider");
const priceTag = document.getElementById("discount-card__price-tag");
const pageViewsText = document.getElementById("discount-card__view-count");

const style = window.getComputedStyle(slider);
const lightGrayishBlue = style.getPropertyValue("--light-grayish-blue");
const softCyan = style.getPropertyValue("--soft-cyan");

slider.addEventListener("mousemove", (event) => {
  const { basePrice, pageviews } = priceModels[event.target.value];

  const gradientStop =
    ((event.target.value - slider.min) / (slider.max - slider.min)) * 100;

  slider.style.backgroundImage = `linear-gradient(to right, ${softCyan} ${gradientStop}%, ${lightGrayishBlue} ${gradientStop}%)`;

  priceTag.textContent = formatCurrency(basePrice);
  pageViewsText.textContent = pageviews + " Pageviews";
});

//helper functions
const formatCurrency = (value, options) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
};
