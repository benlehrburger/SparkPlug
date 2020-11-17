Promise.all([
	InboxSDK.load('1', 'sdk_SparkPlug_f529ba8ded')
])
.then(function(results) {
	var sdk = results[0];

	// load SDK view with newly initialized function
	sdk.Compose.registerComposeViewHandler(function(composeView){

		// add Herrmann SparkPlug access point to compose toolbar
		composeView.addButton({
			title: "Herrmann SparkPlug",
			iconUrl: 'https://i.ibb.co/xzs5xw7/herrmann-nc-squarelogo-1525363720650.png',
			onClick: function(event) {

				/*
				*   FRAMEWORK
				*/

				// Add SparkPlug action box on click
				let actionsBox = document.createElement('div');
				actionsBox.style = 'width: 280px; height: 538px; position: absolute; z-index: 2000000000; background-color: #f6f8ff; border-radius: 8px; bottom: 0; overflow-x: hidden; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);';
				actionsBox.id = 'actionsBox';
				document.body.prepend(actionsBox);

				/*
				*   LOGIN
				*/

				function renderLogIn() {

					// Make login container
					let login = document.createElement('div');
					login.style = 'width: 90%; padding-left: 14px; font-size: 20px; padding-top: 125px; padding-bottom: 10px;';
					login.id = 'login';
					login.innerHTML = 'Sign in to the Thinker Portal';
					actionsBox.appendChild(login);

					// Handle username and password inputs
					var usernameInput;
					var passwordInput;
					function input(placeholder, type, id) {
						let form = document.createElement('div');
						form.style = 'padding-top: 15px;';
						let input = document.createElement('input');
						input.style = 'width: 80%; width: 100%; padding: 12px 20px; margin: 8px 0; display: inline-block; border: 1px solid #ccc; font-size: 16px; border-radius: 4px; box-sizing: border-box;';
						input.placeholder = placeholder;
						input.id = id;
						form.appendChild(input);
						var forgot = document.createElement('a');
						var str = 'Forgot ' + type;
						var linkText = document.createTextNode(str);
						forgot.style = 'font-size: 13px; color: #64b7de; padding-left: 10px; text-decoration: none;';
						forgot.appendChild(linkText);
						forgot.href = 'https://axon.herrmannsolutions.net/account/login';
						form.appendChild(forgot);
						login.appendChild(form);
					}
					input('Username', 'username?', 'username');
					input('Password', 'password?', 'password');

					// Render login button
					let logButton = document.createElement('button');
					logButton.style = 'height: 30px; width: 140px; border: 1px solid #CCCCCC; font-size: 18px; background-color: #ffffff; border-radius: 4px; position: relative; text-align: center; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19); text-align: center; font-size: 16px; cursor: pointer; display: flex; justify-content: center; align-items: center;';
					logButton.innerHTML = 'Login';
					let containLog = document.createElement('div');
					containLog.style = 'width: 140px; height: 30px; position: relative; cursor: pointer; margin-left: 55px; margin-top: 25px; margin-bottom: 15px;';
					containLog.appendChild(logButton);
					login.appendChild(containLog);

					// Login if correct credentials given
					logButton.onclick = function() {
						if (document.getElementById('username').value == 'test@thinkherrmann.com' && document.getElementById('password').value == 'testpassword') {
							login.remove();
							loggedOut = false;
							renderSpark();
						} else {
							let error = document.createElement('div');
							error.innerHTML = 'Incorrect username or password! Try again.'
							error.style = 'color: red; font-size: 13px; padding-left: 1px;';
							login.appendChild(error);
						}
					}
				}

				/*
				*   SPARK
				*/

				function renderSpark() {

					let spark = document.createElement('div');
					spark.style = 'padding-top: 46px;';
					spark.id = 'spark';
					actionsBox.appendChild(spark);

					// Read the email recipients
					var recipients = event.composeView.getToRecipients();
					var ccs = event.composeView.getCcRecipients();
					var bccs = event.composeView.getBccRecipients();
					recipients.push.apply(recipients, ccs.concat(bccs));

					function renderTable(scoreData) {
						
						let tableContain = document.createElement('div');
						tableContain.style = 'width: 100%; height: 100px; position: relative; display: flex; padding-bottom: 6px;';
						let writeContain = document.createElement('div');
						writeContain.style = 'position: relative; display: flex; flex-direction: column; padding-top: 22px; float: right;';
						tableContain.prepend(writeContain);
						let PCWrite = document.createElement('div');
						PCWrite.style = 'position: relative; font-size: 14px; float: right; padding-bottom: 4px; padding-right: 2px;';
						PCWrite.innerHTML = 'Preference Code';
						writeContain.appendChild(PCWrite);
						let profWrite = document.createElement('div');
						profWrite.style = 'position: relative; font-size: 14px; float: right; padding-bottom: 4px; padding-left: 24px;';
						profWrite.innerHTML = 'Profile Score';
						writeContain.appendChild(profWrite);
						let UPWrite = document.createElement('div');
						UPWrite.style = 'position: relative; font-size: 14px; float: right; padding-left: 8px;';
						UPWrite.innerHTML = 'Under Pressure';
						writeContain.appendChild(UPWrite);

						// Get variables from parameter array
						var A = scoreData[0];
						var B = scoreData[1];
						var C = scoreData[2];
						var D = scoreData[3];
						var AUP = scoreData[4];
						var BUP = scoreData[5];
						var CUP = scoreData[6];
						var DUP = scoreData[7];
						var APC = scoreData[8];
						var BPC = scoreData[9];
						var CPC = scoreData[10];
						var DPC = scoreData[11];

						var s;
						for (s = 0; s < 4; s++) {
							let scoreTable = document.createElement('div');
							scoreTable.style = 'width: 34px; height: 85px; position: relative; margin-left: 2px; border-radius: 4px; display: flex; justify-content: center; font-size: 15px;';
							tableContain.appendChild(scoreTable);
							let innerBox = document.createElement('div');
							innerBox.style = 'width: 30px; height: 65px; position: absolute; top: 18px; border-radius: 0 0 4px 4px; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center;';

							function quadScores(preference, profile, underPressure) {
								let profNum = document.createElement('div');
								profNum.style = 'position: relative; font-size: 13px; padding-bottom: 2px; padding-top: 3px;';
								profNum.innerHTML = preference;
								innerBox.appendChild(profNum);
								let profScore = document.createElement('div');
								profScore.style = 'position: relative; font-size: 13px; padding-bottom: 2px; padding-top: 2px;';
								profScore.innerHTML = profile;
								innerBox.appendChild(profScore);
								let UPScore = document.createElement('div');
								UPScore.style = 'position: relative; font-size: 13px; padding-top: 2px; padding-bottom: 3px;';
								UPScore.innerHTML = underPressure;
								innerBox.appendChild(UPScore);
							}

							if (s == 0) {
								scoreTable.style.background = '#80D4F1';
								scoreTable.innerHTML = '<b>A</b>';
								quadScores(APC, A, AUP);
							}
							if (s == 1) {
								scoreTable.style.background = '#9FD5B4';
								scoreTable.innerHTML = '<b>B</b>';
								quadScores(BPC, B, BUP);
							}
							if (s == 2) {
								scoreTable.style.background = '#F38595';
								scoreTable.innerHTML = '<b>C</b>';
								quadScores(CPC, C, CUP);
							}
							if (s == 3) {
								scoreTable.style.background = '#FCE98E';
								scoreTable.innerHTML = '<b>D</b>';
								quadScores(DPC, D, DUP);
							}
							scoreTable.appendChild(innerBox);
						};

						return tableContain;
					};

					function renderProfile(scoreData) {
						
						// Make Herrmann Profile
						let containProfile = document.createElement('div');
						containProfile.style = 'width: 260px; height: 260px; position: relative; display: flex; justify-content: center; align-items: center;';

						// Quadrants
						let topRight = document.createElement('div');
						topRight.style = 'width: 50%; height: 50%; background: #FDD531; border-radius: 0 100% 0 0; float: right;';
						let bottomRight = document.createElement('div');
						bottomRight.style = 'width: 50%; height: 50%; background: #EF3C50; border-radius: 0 0 100% 0; float: right;';
						let bottomLeft = document.createElement('div');
						bottomLeft.style = 'width: 50%; height: 50%; background: #56BC7A; border-radius: 0 0 0 100%; float: left;';
						let topLeft = document.createElement('div');
						topLeft.style = 'width: 50%; height: 50%; background: #2BC0F0; border-radius: 100% 0 0 0; float: left;';
						let background = document.createElement('div');
						background.style = 'width: 100%; height: 100%; position: relative;';
						background.appendChild(topLeft);
						background.appendChild(topRight);
						background.appendChild(bottomLeft);
						background.appendChild(bottomRight);
						containProfile.appendChild(background);

						// Ripples
						let ripple1 = document.createElement('div');
						ripple1.style = 'width: 25%; height: 25%; background: none; border: 1px solid rgba(255, 255, 255, .5); border-radius: 50%; position: absolute; margin: 0; top: 50%; left: 50%; transform: translate(-50%, -50%);';
						let ripple2 = document.createElement('div');
						ripple2.style = 'width: 50%; height: 50%; background: none; border: 1px solid rgba(255, 255, 255, .5); border-radius: 50%; position: absolute; margin: 0; top: 50%; left: 50%; transform: translate(-50%, -50%);';
						let ripple3 = document.createElement('div');
						ripple3.style = 'width: 75%; height: 75%; background: none; border: 1px solid rgba(255, 255, 255, .5); border-radius: 50%; position: absolute; margin: 0; top: 50%; left: 50%; transform: translate(-50%, -50%);';
						containProfile.appendChild(ripple1);
						containProfile.appendChild(ripple2);
						containProfile.appendChild(ripple3);

						// Axis
						let brAxis = document.createElement('div');
						brAxis.style = 'border-left: .5px solid black; height: 100%; top: 0; position: absolute; left: 50%; transform: rotate(90deg);';

						// Ticks
						var t;
						var xCoordinate = -230;
						var yCoordinate = 20;
						let ticks = [];
						for (t = 1; t <= 27; t++) {
							let xTick = document.createElement('div');
							xTick.style = 'border-left: .5px solid black; height: 2%; position: absolute;';
							xTick.style.transform = 'rotate(90deg)';
							xTick.style.transform += "translateX(" + xCoordinate + "%)";
							xTick.style.transform += "translateY(" + yCoordinate + "%)";
							xCoordinate += 1000;
							ticks.push(xTick);
						};
						var x;
						for (x = 0; x < ticks.length; x++) {
							brAxis.appendChild(ticks[x]);
						};

						// Axes
						let axisContain = document.createElement('div');
						axisContain.appendChild(brAxis);
						let gyAxis = brAxis.cloneNode(true);
						axisContain.appendChild(gyAxis);
						gyAxis.style.transform = 'rotate(45deg)';
						brAxis.style.transform = 'rotate(-45deg)';
						containProfile.appendChild(axisContain);

						let containPoly = document.createElement('div');
						containPoly.style = 'width: 100%; height: 100%; position: absolute; padding-top: 14.4%; padding-left: 14.4%;';
						background.appendChild(containPoly);
						
						function pythag(score) {
							return score/Math.sqrt(2);
						}

						var hyp = containProfile.style.width.slice(0,3);
						var axe = hyp / Math.sqrt(2);
						var halfAxis = axe/2;

						function lesserQuad(score) {
							var buffer = 2;
							return (halfAxis - pythag(score) + buffer);
						}

						function greaterQuad(score) {
							return (halfAxis + pythag(score));
						}

						let canvas = document.createElement('canvas');
						var expandedAxis = axe + 4;
						canvas.setAttribute('width', expandedAxis);
						canvas.setAttribute('height', expandedAxis);

						// Get variables from parameter array
						var A = scoreData[0];
						var B = scoreData[1];
						var C = scoreData[2];
						var D = scoreData[3];
						var AUP = scoreData[4];
						var BUP = scoreData[5];
						var CUP = scoreData[6];
						var DUP = scoreData[7];

						// Draw normal scores
						var normal = canvas.getContext("2d");
						normal.beginPath();
						normal.moveTo(lesserQuad(A), lesserQuad(A));
						normal.lineTo(lesserQuad(B), greaterQuad(B));
						normal.lineTo(greaterQuad(C), greaterQuad(C));
						normal.lineTo(greaterQuad(D), lesserQuad(D));
						normal.lineWidth = 2;
						normal.closePath();
						normal.stroke();

						// Draw under pressure
						var underPressure = canvas.getContext("2d");
						underPressure.beginPath();
						underPressure.moveTo(lesserQuad(AUP), lesserQuad(AUP));
						underPressure.lineTo(lesserQuad(BUP), greaterQuad(BUP));
						underPressure.lineTo(greaterQuad(CUP), greaterQuad(CUP));
						underPressure.lineTo(greaterQuad(DUP), lesserQuad(DUP));
						underPressure.setLineDash([6, 8]);
						underPressure.lineWidth = 1;
						underPressure.closePath();
						underPressure.stroke();

						containPoly.appendChild(canvas);

						let containProf = document.createElement('div');
						containProf.style = 'width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;';
						containProf.appendChild(containProfile);

						return containProf;
					}
					
					// Filter through email recipients and pull name and email for each
					let div = document.createElement('div');
					// if no recipients of the email ...
					if (recipients.length == 0) {
						div.style = 'text-align: center; padding-top: 190px;';
						let none = document.createElement('p');
						none.innerHTML = 'Add email recipients to view profiles.';
						none.style = 'font-size: 14px; text-align: center;';
						div.innerHTML += 'No profiles to show!';
						div.appendChild(none);
						spark.prepend(div);
					} 
					// if recipients of the email ...
					else {
						let allProfiles = [];

						// Create mock profile scores
						function makeProfile() {
							let userProfile = [];
							let userUnderPressure = [];
							let userPreference = [];
							let j = 0;
							while (j < 4) {
								// Random profile score
								var randomScore = parseInt(Math.random() * (130 - 30) + 30);
								userProfile.push(randomScore);

								// Random under pressure score
								var randomUP = parseInt(Math.random() * ((randomScore + 20) - (randomScore - 20)) + (randomScore - 20));
								userUnderPressure.push(randomUP);

								// Get preference codes based on quadrant scores
								userPreference.push(getPreference(randomScore));
								j += 1;
							}
							let prof = userProfile.concat(userUnderPressure.concat(userPreference));
							allProfiles.push(prof);
							return prof;
						}

						// Get a user's preference code based on quadrant scores
						function getPreference(quadrant) {
							let prefCode;
							if (quadrant <= 33) {
								prefCode = 3;
							}
							else if (quadrant > 33 && quadrant <= 66) {
								prefCode = 2;
							}
							else if (quadrant > 66) {
								prefCode = 1;
							}
							return prefCode;
						}

						// Create button to take user to shared profile on Axon portal
						function renderShareButton() {
							let sharedProfile = document.createElement('div');
							sharedProfile.style = 'height: 30px; width: 200px; border-radius: 8px; background-color: #ffffff; border: 1px solid #224264; position: relative; text-align: center; box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19); text-align: center; font-size: 16px; cursor: pointer; display: flex; justify-content: center; align-items: center;';
							sharedProfile.innerHTML = 'View Shared Profile';
							let containButton = document.createElement('div');
							containButton.style = 'width: 200px; height: 30px; position: relative; cursor: pointer; margin-left: 30px; margin-top: 25px; margin-bottom: 15px;';
							containButton.appendChild(sharedProfile);
							containButton.onclick = function() {
								window.location.href = 'https://journey.herrmannsolutions.net/thinker';
							}
							return containButton;
						}

						// Render a composite profile of thinking preferences of all email recipients
						function compositeProfile() {
							let composite = [];
							let aggregateA = 0;
							let aggregateB = 0;
							let aggregateC = 0;
							let aggregateD = 0;
							let aggregateUPA = 0;
							let aggregateUPB = 0;
							let aggregateUPC = 0;
							let aggregateUPD = 0;
							var j;
							for (j = 0; j < allProfiles.length; j++) {
								aggregateA += allProfiles[j][0];
								aggregateB += allProfiles[j][1];
								aggregateC += allProfiles[j][2];
								aggregateD += allProfiles[j][3];
								aggregateUPA += allProfiles[j][4];
								aggregateUPB += allProfiles[j][5];
								aggregateUPC += allProfiles[j][6];
								aggregateUPD += allProfiles[j][7];
							}

							// Get averages for each quadrant
							let compositeA = parseInt(aggregateA / allProfiles.length);
							composite.push(compositeA);
							let compositeB = parseInt(aggregateB / allProfiles.length);
							composite.push(compositeB);
							let compositeC = parseInt(aggregateC / allProfiles.length);
							composite.push(compositeC);
							let compositeD = parseInt(aggregateD / allProfiles.length);
							composite.push(compositeD);
							let compositeUPA = parseInt(aggregateUPA / allProfiles.length);
							composite.push(compositeUPA);
							let compositeUPB = parseInt(aggregateUPB / allProfiles.length);
							composite.push(compositeUPB);
							let compositeUPC = parseInt(aggregateUPC / allProfiles.length);
							composite.push(compositeUPC);
							let compositeUPD = parseInt(aggregateUPD / allProfiles.length);
							composite.push(compositeUPD);
							
							// Get preference codes based on averages
							composite.push(getPreference(compositeA));
							composite.push(getPreference(compositeB));
							composite.push(getPreference(compositeC));
							composite.push(getPreference(compositeD));

							// Render table and profile above recipient list
							let containProfile = document.createElement('div');
							containProfile.style = 'padding-bottom: 20px;';
							containProfile.appendChild(renderProfile(composite));
							spark.prepend(containProfile);
							let containTable = document.createElement('div');
							containTable.style = 'padding-left: 15px;';
							let compositeText = document.createElement('div');
							compositeText.innerHTML = 'Group Profile';
							compositeText.style = 'font-size: 20px; padding-left: 63px; padding-top: 18px; padding-bottom: 22px;';
							containTable.prepend(compositeText);
							containTable.appendChild(renderTable(composite))
							spark.prepend(containTable);
						}

						if (recipients.length == 1) {
							let mockProf = makeProfile();
							let profContain = document.createElement('div');
							profContain.style = 'display: flex; flex-direction: column; align-items: center; justify-content: center;';
							let profileName = document.createElement('div');
							profileName.style = 'font-size: 20px; padding-top: 10px; padding-bottom: 15px;';
							if (recipients[0].name != null) {
								profileName.innerHTML = recipients[0].name;
							} else {
								profileName.innerHTML = recipients[0].emailAddress;
							}
							profContain.prepend(profileName);
							let table = document.createElement('div');
							table.appendChild(renderTable(mockProf));
							profContain.appendChild(table);
							profContain.appendChild(renderProfile(mockProf));
							let share = document.createElement('div');
							share.style = 'margin-right: 35px;';
							share.appendChild(renderShareButton());
							profContain.appendChild(share);
							spark.appendChild(profContain);
						} 
						
						else {
							var i;
							for (i = 0; i < recipients.length; i++) {
								
								// Create list item for each email recipient
								let accordion = document.createElement('button');
								accordion.style = 'cursor: pointer; padding: 10px; width: 100%; background: #f6f8ff; text-align: left; border: none; outline: none; transition: 0.4s; font-size: 16px;';
								accordion.id = 'accordion';
								if (recipients[i].name != null) {
									accordion.innerHTML += recipients[i].name;
								} else {
									accordion.innerHTML += recipients[i].emailAddress;
								}

								// Downarrow on accordion display
								let downarrow = document.createElement('img');
								downarrow.src = 'https://www.flaticon.com/svg/static/icons/svg/54/54785.svg';
								downarrow.style = 'width: 10px; height: 10px; position: relative; float: right; padding-right: 3px; padding-top: 5px; display: block; float: right;';
								accordion.appendChild(downarrow);

								// Uparrow on accordion withdrawal
								let uparrow = document.createElement('img');
								uparrow.src = 'https://www.flaticon.com/svg/static/icons/svg/54/54817.svg';
								uparrow.style = 'width: 10px; height: 10px; position: relative; float: right; padding-right: 3px; padding-top: 5px; display: none; float: right;';
								accordion.appendChild(uparrow);

								// Make mock profile
								let mockProfile = makeProfile();
											
								let panel = document.createElement('div');
								panel.style = 'padding: 10px; display: none; overflow: hidden; font-size: 12px;';
								// Code to display a user's email: panel.innerHTML += recipients[i].emailAddress;
								panel.appendChild(renderTable(mockProfile));
								panel.appendChild(renderProfile(mockProfile));
								panel.appendChild(renderShareButton());

								// Listen for button click
								accordion.addEventListener("click", function() {
									this.classList.toggle("active");
									var panel = this.nextElementSibling;
									if (panel.style.display === "block") {
										panel.style.display = "none";
										uparrow.style.display = "none";
										downarrow.style.display = "block";
									} else {
										panel.style.display = "block";
										uparrow.style.display = "block";
										downarrow.style.display = "none";
									}
								});
								spark.appendChild(accordion);
								spark.appendChild(panel);
							}

							// Render composite view only if more than 1 recipient
							if (recipients.length > 1) {
								compositeProfile();
							}
						}	
					}
				}	

				/*
				*   HEADER
				*/

				function renderHeader() {

					// Render SparkPlug action box header
					let actionsBoxheader = document.createElement('div');
					actionsBoxheader.style = 'padding: 10px; cursor: move; z-index: 30000000000; background-color: #f6f8ff; position: fixed; border-bottom: 1px solid grey;';
					let herrmannIcon = document.createElement('img');
					// add Herrmann icon
					herrmannIcon.src = 'https://i.ibb.co/xzs5xw7/herrmann-nc-squarelogo-1525363720650.png';
					herrmannIcon.id = "herrmannIcon";
					herrmannIcon.onclick = function() {
						window.location.href = 'https://www.thinkherrmann.com/';
					}
					herrmannIcon.style = 'width: 18px; height: 18px; float: left; cursor: pointer; padding-right: 5px; padding-top: 2px;';
					actionsBoxheader.prepend(herrmannIcon);
					actionsBoxheader.innerHTML += 'Herrmann SparkPlug';
					actionsBoxheader.id = 'actionsBoxheader';
					actionsBox.prepend(actionsBoxheader);

					// Add additional actions icon to header
					let actionsContain = document.createElement('div');
					let actions = document.createElement('img');
					actions.src = 'https://i.ibb.co/LhWz2qK/61140.png';
					actions.id = 'actionsIcon';
					actions.style = 'width: 15px; height: 15px;';
					actionsContain.style = 'margin-left: 55px; cursor: pointer; padding-top: 3px; display: inline-block;';
					actionsContain.appendChild(actions);
					actionsBoxheader.appendChild(actionsContain);

					// Style dropdown actions menu
					let dropdown = document.createElement('div');
					dropdown.style = 'display: none; top: 44px; width: 100px; height: 60px; right: 30px; border-radius: 4px; position: absolute; background-color: #ffffff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 40000000000000;';
					actionsContain.appendChild(dropdown);

					// Log Out button
					let logOutContain = document.createElement('div');
					logOutContain.style = 'position: relative; width: 90px; display: flex; border-bottom: 1px solid grey; padding: 5px;';
					let logOutIcon = document.createElement('img');
					logOutIcon.src = 'https://www.flaticon.com/svg/static/icons/svg/64/64572.svg';
					logOutIcon.style = 'width: 15px; height: 15px; padding-top: 2px; padding-right: 10px; padding-left: 3px;';
					logOutContain.appendChild(logOutIcon);
					let logOut = document.createElement('div');
					logOut.innerHTML = 'Log Out';
					logOutContain.appendChild(logOut);
					dropdown.appendChild(logOutContain);
					
					// Listen for log out click and return to log in page
					logOutContain.addEventListener("click", function() {
						actionsBox.innerHTML = '';
						renderHeader();
						renderLogIn();
						dropdown.style.display = "none";
					});

					// Reload button
					let reloadContain = document.createElement('div');
					reloadContain.style = 'position: relative; width: 90px; display: flex; padding: 5px;';
					let reloadIcon = document.createElement('img');
					reloadIcon.src = 'https://www.flaticon.com/svg/static/icons/svg/860/860822.svg';
					reloadIcon.style = 'width: 15px; height: 15px; padding-top: 2px; padding-right: 10px; padding-left: 3px;';
					reloadContain.appendChild(reloadIcon);
					let reload = document.createElement('div');
					reload.innerHTML = 'Refresh'
					reloadContain.appendChild(reload);
					dropdown.appendChild(reloadContain);

					// Listen for refresh click and re-render current page
					reloadContain.addEventListener("click", function() {
						if (document.getElementById('spark') != null) {
							actionsBox.innerHTML = '';
							//actionsBox.appendChild(actionsBoxheader);
							renderHeader();
							renderSpark();
						} else {
							actionsBox.innerHTML = '';
							//actionsBox.appendChild(actionsBoxheader);
							renderHeader();
							renderLogIn();
						}
					});

					// Listen for actions box clicks
					actions.addEventListener("click", function() {
						this.classList.toggle("active");
						if (dropdown.style.display === "block") {
							dropdown.style.display = "none";
						} else {
							dropdown.style.display = "block";
						}
					});

					// Add close icon to header
					let close = document.createElement('img');
					close.src = 'https://i.ibb.co/zF0V25b/Full-Rounded-Cancel-512.png;';
					close.id = 'closeIcon';
					close.style = 'width: 15px; height: 15px; float: right; cursor: pointer; padding-top: 3px; padding-left: 4px;';
					actionsBoxheader.appendChild(close);
					// listen for click
					close.addEventListener("click", function() {
						this.parentElement.parentElement.style.display = 'none';
					});

					// Handle action box move event
					function dragElement(elmnt) {
						var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
						if (document.getElementById(elmnt.id + "header")) {
							// if present, the header is where you move the DIV from
							document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
						} else {
							// otherwise, move the DIV from anywhere inside the DIV
							elmnt.onmousedown = dragMouseDown;
						}
						function dragMouseDown(e) {
							e = e || window.event;
							e.preventDefault();
							// get the mouse cursor position at startup
							pos3 = e.clientX;
							pos4 = e.clientY;
							document.onmouseup = closeDragElement;
							// call a function whenever the cursor moves
							document.onmousemove = elementDrag;
						}
						function elementDrag(e) {
							e = e || window.event;
							e.preventDefault();
							// calculate the new cursor position
							pos1 = pos3 - e.clientX;
							pos2 = pos4 - e.clientY;
							pos3 = e.clientX;
							pos4 = e.clientY;
							// set the element's new position
							elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
							elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
						}
						function closeDragElement() {
							// stop moving when mouse button is released
							document.onmouseup = null;
							document.onmousemove = null;
						}
					}
					dragElement(document.getElementById("actionsBox"));
				}

				// Upon opening the SparkPlug, render the log in page
				renderHeader();
				renderLogIn();
			},
		});
	});
});
