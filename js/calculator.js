// Two tools: a mortgage calculator and a "what can I afford?" estimate.

const urlPrice = Number(new URLSearchParams(location.search).get('price'));
if (urlPrice) $('#calcPrice').value = Math.min(Math.max(urlPrice, 100000), 3000000);

function showMortgage() {
  const price = Number($('#calcPrice').value);
  const downPercent = Number($('#calcDown').value);
  const rate = Number($('#calcRate').value);
  const years = Number($('#calcYears').value);

  const down = price * downPercent / 100;
  const loan = price - down;
  const monthly = monthlyPayment(loan, rate, years);
  const interest = monthly * years * 12 - loan;
  const interestShare = Math.round(interest / (interest + loan) * 100);

  $('#priceOut').textContent = formatMoney(price);
  $('#downOut').textContent = downPercent + '% (' + formatMoney(down) + ')';
  $('#rateOut').textContent = rate.toFixed(1) + '%';
  $('#yearsOut').textContent = years + ' years';

  $('#monthly').textContent = formatMoney(monthly);
  $('#loan').textContent = formatMoney(loan);
  $('#interest').textContent = formatMoney(interest);
  $('#totalCost').textContent = formatMoney(down + loan + interest);
  $('#splitLoan').style.width = (100 - interestShare) + '%';
  $('#splitInterest').style.width = interestShare + '%';
}

// Common lender rule: housing costs under 28% of income, all debts under 36%
function showAfford() {
  const income = Number($('#income').value) || 0;
  const debts = Number($('#debts').value) || 0;
  const savings = Number($('#savings').value) || 0;
  const rate = Number($('#affRate').value);

  const budget = Math.max(0, Math.min(income / 12 * 0.28, income / 12 * 0.36 - debts));
  const monthlyRate = rate / 100 / 12;
  const months = 360;
  const loan = budget * (1 - Math.pow(1 + monthlyRate, -months)) / monthlyRate;
  const maxPrice = Math.round((loan + savings) / 10000) * 10000;

  $('#affRateOut').textContent = rate.toFixed(1) + '%';
  $('#budget').textContent = formatMoney(budget);
  $('#maxPrice').textContent = formatMoney(maxPrice);
  $('#seeHomes').href = 'properties.html?status=buy&max=' + maxPrice;
  $('#seeHomes').hidden = maxPrice < 100000;
}

$$('#mortgage input').forEach(function (el) { el.addEventListener('input', showMortgage); });
$$('#afford input').forEach(function (el) { el.addEventListener('input', showAfford); });
showMortgage();
showAfford();
