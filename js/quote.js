// --- Form Switching ---
document.addEventListener('DOMContentLoaded', function () {
	// Hide/show insurance fields
	var typeRadios = document.querySelectorAll('input[name="insuranceType"]');
	var autoFields = document.getElementById('autoFields') || document.getElementById('auto-fields');
	var homeFields = document.getElementById('homeFields') || document.getElementById('home-fields');
	var lifeFields = document.getElementById('lifeFields') || document.getElementById('life-fields');
	var allFields = [autoFields, homeFields, lifeFields];

	function setRequiredAttrs(container, required) {
		if (!container) return;
		var fields = container.querySelectorAll('[data-dynamic-required]');
		fields.forEach(function(field) {
			if (required) {
				field.setAttribute('required', 'required');
			} else {
				field.removeAttribute('required');
			}
		});
	}
	function showFields(type) {
		allFields.forEach(function (div) {
			if (div) {
				div.classList.add('d-none');
				setRequiredAttrs(div, false);
			}
		});
		var showDiv = {
			auto: autoFields,
			home: homeFields,
			life: lifeFields
		}[type];
		if (showDiv) {
			showDiv.classList.remove('d-none');
			setRequiredAttrs(showDiv, true);
		}
	}

	typeRadios.forEach(function (radio) {
		radio.addEventListener('change', function () {
			showFields(this.value);
			clearErrors(document.getElementById('quoteForm'));
		});
	});

	// Initial state
	var checked = document.querySelector('input[name="insuranceType"]:checked');
	if (checked) showFields(checked.value);

	// --- Form Validation & Submission ---
	var form = document.getElementById('quoteForm');
	if (!form) return;
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		clearErrors(form);
		var type = document.querySelector('input[name="insuranceType"]:checked');
		if (!type) return;
		var valid = validateForm(type.value, form);
		if (valid) {
			var result = calculateQuote(type.value, form);
			showResults(result);
		}
	});

	// --- Get Another Quote ---
	var resultsDiv = document.getElementById('quoteResults');
	if (resultsDiv) {
		resultsDiv.addEventListener('click', function (e) {
			if (e.target && e.target.id === 'resetQuote') {
				resultsDiv.classList.add('d-none');
				form.reset();
				clearErrors(form);
				var checked = document.querySelector('input[name="insuranceType"]:checked');
				if (checked) showFields(checked.value);
			}
		});
	}
});

// --- Mark all dynamic required fields in HTML ---
// This is needed so we can toggle 'required' attribute dynamically
document.addEventListener('DOMContentLoaded', function () {
	['autoFields','homeFields','lifeFields'].forEach(function(id) {
		var div = document.getElementById(id);
		if (div) {
			div.querySelectorAll('input,select,textarea').forEach(function(field) {
				if (field.hasAttribute('required')) {
					field.setAttribute('data-dynamic-required','1');
				}
			});
		}
	});
});

// --- Validation Helpers ---
function validateZipCode(zip) {
	return /^\d{5}$/.test(zip);
}

function showError(inputElement, message) {
	inputElement.classList.add('is-invalid');
	var feedback = inputElement.nextElementSibling;
	if (!feedback || !feedback.classList.contains('invalid-feedback')) {
		feedback = document.createElement('div');
		feedback.className = 'invalid-feedback';
		inputElement.parentNode.appendChild(feedback);
	}
	feedback.textContent = message;
}

function clearErrors(form) {
	var invalids = form.querySelectorAll('.is-invalid');
	invalids.forEach(function (el) {
		el.classList.remove('is-invalid');
	});
	var feedbacks = form.querySelectorAll('.invalid-feedback');
	feedbacks.forEach(function (el) {
		el.textContent = '';
	});
}

function validateForm(type, form) {
	var valid = true;
	function check(input, fn, msg) {
		if (!fn(input.value)) {
			showError(input, msg);
			valid = false;
		}
	}
	if (type === 'auto') {
		var name = form.autoName;
		var age = form.autoAge;
		var zip = form.autoZip;
		var year = form.vehicleYear;
		var make = form.vehicleMake;
		var model = form.vehicleModel;
		var mileage = form.annualMileage;
		var record = form.drivingRecord;
		var coverage = form.autoCoverage;
		check(name, v => v.trim().length >= 2, 'Full Name required (min 2 chars)');
		check(age, v => v && v >= 16 && v <= 100, 'Age 16-100 required');
		check(zip, validateZipCode, 'ZIP must be 5 digits');
		check(year, v => v && v >= 1990 && v <= 2026, 'Year 1990-2026 required');
		check(make, v => v, 'Select vehicle make');
		check(model, v => v.trim().length > 0, 'Vehicle model required');
		check(mileage, v => v, 'Select annual mileage');
		check(record, v => v, 'Select driving record');
		if (!form.querySelector('input[name="autoCoverage"]:checked')) {
			showError(form.autoPremium, 'Select coverage level');
			valid = false;
		}
	} else if (type === 'home') {
		var name = form.homeName;
		var age = form.homeAge;
		var zip = form.homeZip;
		var value = form.homeValue;
		var year = form.yearBuilt;
		var sqft = form.squareFootage;
		var constr = form.constructionType;
		var coverage = form.homeCoverage;
		check(name, v => v.trim().length >= 2, 'Full Name required (min 2 chars)');
		check(age, v => v && v >= 18 && v <= 100, 'Age 18-100 required');
		check(zip, validateZipCode, 'ZIP must be 5 digits');
		check(value, v => v && v >= 50000, 'Home value $50,000+ required');
		check(year, v => v && v >= 1900 && v <= 2026, 'Year 1900-2026 required');
		check(sqft, v => v && v >= 500 && v <= 10000, '500-10000 sq ft required');
		check(constr, v => v, 'Select construction type');
		if (!form.querySelector('input[name="homeCoverage"]:checked')) {
			showError(form.homePremium, 'Select coverage level');
			valid = false;
		}
	} else if (type === 'life') {
		var name = form.lifeName;
		var age = form.lifeAge;
		var zip = form.lifeZip;
		var gender = form.gender;
		var smoker = form.smoker;
		var amount = form.coverageAmount;
		var exercise = form.exercise;
		var coverage = form.lifeCoverage;
		check(name, v => v.trim().length >= 2, 'Full Name required (min 2 chars)');
		check(age, v => v && v >= 18 && v <= 85, 'Age 18-85 required');
		check(zip, validateZipCode, 'ZIP must be 5 digits');
		check(gender, v => v, 'Select gender');
		if (!form.querySelector('input[name="smoker"]:checked')) {
			showError(form.smokerNo, 'Select smoker status');
			valid = false;
		}
		check(amount, v => v, 'Select coverage amount');
		check(exercise, v => v, 'Select exercise frequency');
		if (!form.querySelector('input[name="lifeCoverage"]:checked')) {
			showError(form.lifePremium, 'Select coverage level');
			valid = false;
		}
	}
	return valid;
}

// --- Quote Calculation ---
function calculateQuote(type, form) {
	var breakdown = [];
	var name = '';
	var monthly = 0;
	if (type === 'auto') {
		name = form.autoName.value;
		var base = 75;
		var age = parseInt(form.autoAge.value, 10);
		var year = parseInt(form.vehicleYear.value, 10);
		var mileage = form.annualMileage.value;
		var record = form.drivingRecord.value;
		var coverage = form.querySelector('input[name="autoCoverage"]:checked').value;
		// Age factor
		var ageF = age < 25 ? 1.5 : (age > 65 ? 1.3 : 1.0);
		breakdown.push(['Age', age, ageF === 1.5 ? '+50% (young driver)' : ageF === 1.3 ? '+30% (senior)' : 'Standard']);
		// Vehicle age
		var vAge = 2026 - year;
		var vAgeF = vAge < 3 ? 1.3 : (vAge <= 10 ? 1.0 : 0.8);
		breakdown.push(['Vehicle Age', vAge + ' years', vAgeF === 1.3 ? '+30% (new car)' : vAgeF === 0.8 ? '-20% (old car)' : 'Standard']);
		// Mileage
		var mF = mileage === 'Under 5000' ? 0.8 : mileage === '5000-10000' ? 1.0 : mileage === '10001-15000' ? 1.1 : mileage === '15001-20000' ? 1.3 : 1.5;
		breakdown.push(['Annual Mileage', mileage, mF === 0.8 ? '-20%' : mF === 1.1 ? '+10%' : mF === 1.3 ? '+30%' : mF === 1.5 ? '+50%' : 'Standard']);
		// Driving record
		var dF = record === 'Clean' ? 1.0 : record === '1 Ticket' ? 1.2 : record === '2+ Tickets' ? 1.5 : 1.8;
		breakdown.push(['Driving Record', record, dF === 1.2 ? '+20%' : dF === 1.5 ? '+50%' : dF === 1.8 ? '+80%' : 'Standard']);
		// Coverage
		var cF = coverage === 'Basic' ? 0.8 : coverage === 'Premium' ? 1.4 : 1.0;
		breakdown.push(['Coverage Level', coverage, cF === 0.8 ? '-20%' : cF === 1.4 ? '+40%' : 'Standard']);
		monthly = base * ageF * vAgeF * mF * dF * cF;
	} else if (type === 'home') {
		name = form.homeName.value;
		var value = parseFloat(form.homeValue.value);
		var base = value * 0.003 / 12;
		var year = parseInt(form.yearBuilt.value, 10);
		var constr = form.constructionType.value;
		var sqft = parseInt(form.squareFootage.value, 10);
		var sec = form.securitySystem.checked;
		var fire = form.fireSprinklers.checked;
		var coverage = form.querySelector('input[name="homeCoverage"]:checked').value;
		// Year built
		var yF = year < 1970 ? 1.4 : year < 2000 ? 1.1 : 1.0;
		breakdown.push(['Year Built', year, yF === 1.4 ? '+40%' : yF === 1.1 ? '+10%' : 'Standard']);
		// Construction
		var cF = constr === 'Wood Frame' ? 1.2 : constr === 'Brick' ? 1.0 : constr === 'Concrete' ? 0.9 : 0.85;
		breakdown.push(['Construction', constr, cF === 1.2 ? '+20%' : cF === 0.9 ? '-10%' : cF === 0.85 ? '-15%' : 'Standard']);
		// Size
		var sF = sqft * 0.01;
		breakdown.push(['Square Footage', sqft, '+$' + sF.toFixed(2) + ' per month']);
		// Security
		var secF = sec ? 0.95 : 1.0;
		breakdown.push(['Security System', sec ? 'Yes' : 'No', sec ? '-5%' : 'None']);
		// Sprinklers
		var fireF = fire ? 0.92 : 1.0;
		breakdown.push(['Fire Sprinklers', fire ? 'Yes' : 'No', fire ? '-8%' : 'None']);
		// Coverage
		var covF = coverage === 'Basic' ? 0.8 : coverage === 'Premium' ? 1.4 : 1.0;
		breakdown.push(['Coverage Level', coverage, covF === 0.8 ? '-20%' : covF === 1.4 ? '+40%' : 'Standard']);
		monthly = (base * yF * cF * secF * fireF * covF) + sF;
	} else if (type === 'life') {
		name = form.lifeName.value;
		var amount = parseInt(form.coverageAmount.value.replace(/[^\d]/g, ''));
		var base = amount * 0.0005 / 12;
		var age = parseInt(form.lifeAge.value, 10);
		var gender = form.gender.value;
		var smoker = form.querySelector('input[name="smoker"]:checked').value;
		var exercise = form.exercise.value;
		var pre = form.preExisting.checked;
		var coverage = form.querySelector('input[name="lifeCoverage"]:checked').value;
		// Age
		var ageF = age <= 30 ? 1.0 : age <= 45 ? 1.5 : age <= 60 ? 2.5 : 4.0;
		breakdown.push(['Age', age, ageF === 1.5 ? '+50%' : ageF === 2.5 ? '+150%' : ageF === 4.0 ? '+300%' : 'Standard']);
		// Gender
		var gF = gender === 'Male' ? 1.1 : gender === 'Non-binary' ? 1.05 : 1.0;
		breakdown.push(['Gender', gender, gF === 1.1 ? '+10%' : gF === 1.05 ? '+5%' : 'Standard']);
		// Smoker
		var sF = smoker === 'Yes' ? 2.0 : 1.0;
		breakdown.push(['Smoker', smoker, sF === 2.0 ? '+100%' : 'None']);
		// Exercise
		var eF = exercise === 'Rarely' ? 1.3 : exercise === '1-2 times per week' ? 1.1 : exercise === '3-4 times per week' ? 1.0 : 0.9;
		breakdown.push(['Exercise', exercise, eF === 1.3 ? '+30%' : eF === 1.1 ? '+10%' : eF === 0.9 ? '-10%' : 'Standard']);
		// Pre-existing
		var pF = pre ? 1.5 : 1.0;
		breakdown.push(['Pre-existing Conditions', pre ? 'Yes' : 'No', pre ? '+50%' : 'None']);
		// Coverage
		var covF = coverage === 'Basic' ? 0.8 : coverage === 'Premium' ? 1.4 : 1.0;
		breakdown.push(['Coverage Level', coverage, covF === 0.8 ? '-20%' : covF === 1.4 ? '+40%' : 'Standard']);
		monthly = base * ageF * gF * sF * eF * pF * covF;
	}
	return {
		name: name,
		type: type,
		monthly: monthly,
		annual: monthly * 12,
		breakdown: breakdown
	};
}

// --- Results Display ---
function showResults(result) {
	var resultsDiv = document.getElementById('quoteResults');
	var content = document.getElementById('resultsContent');
	if (!resultsDiv || !content) return;
	// Clear previous
	content.innerHTML = '';
	// Summary
	var summary = document.createElement('div');
	summary.className = 'mb-4';
	var typeLabel = {
		auto: 'Auto Insurance',
		home: 'Home Insurance',
		life: 'Life Insurance'
	}[result.type] || '';
	summary.innerHTML =
		'<h5>Quote for <span class="text-primary"></span></h5>' +
		'<ul class="list-unstyled mb-0">' +
		'<li><strong>Insurance Type:</strong> ' + typeLabel + '</li>' +
		'<li><strong>Monthly Premium:</strong> <span class="text-success">' + formatCurrency(result.monthly) + '</span></li>' +
		'<li><strong>Annual Premium:</strong> <span class="text-success">' + formatCurrency(result.annual) + '</span></li>' +
		'</ul>';
	summary.querySelector('span.text-primary').textContent = result.name;
	content.appendChild(summary);
	// Breakdown table
	var table = document.createElement('table');
	table.className = 'table table-striped';
	var thead = document.createElement('thead');
	thead.innerHTML = '<tr><th>Factor</th><th>Your Info</th><th>Impact</th></tr>';
	table.appendChild(thead);
	var tbody = document.createElement('tbody');
	result.breakdown.forEach(function (row) {
		addBreakdownRow(tbody, row[0], row[1], row[2]);
	});
	table.appendChild(tbody);
	content.appendChild(table);
	// Reset button
	var resetBtn = document.createElement('button');
	resetBtn.className = 'btn btn-secondary mt-3';
	resetBtn.id = 'resetQuote';
	resetBtn.textContent = 'Get Another Quote';
	content.appendChild(resetBtn);
	resultsDiv.classList.remove('d-none');
	resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function addBreakdownRow(tbody, factor, userValue, impact) {
	var row = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	td1.textContent = factor;
	td2.textContent = userValue;
	td3.textContent = impact;
	row.appendChild(td1);
	row.appendChild(td2);
	row.appendChild(td3);
	tbody.appendChild(row);
}

function formatCurrency(num) {
	return '$' + num.toFixed(2);
}
