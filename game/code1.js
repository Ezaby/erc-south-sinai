gdjs.ScenarioCode = {};
gdjs.ScenarioCode.localVariables = [];
gdjs.ScenarioCode.idToCallbackMap = new Map();
gdjs.ScenarioCode.GDSceneImgObjects1= [];
gdjs.ScenarioCode.GDGlowObjects1= [];
gdjs.ScenarioCode.GDCaptionPanelObjects1= [];
gdjs.ScenarioCode.GDVitalsPanelObjects1= [];
gdjs.ScenarioCode.GDHudPanelObjects1= [];
gdjs.ScenarioCode.GDSlotsPanelObjects1= [];
gdjs.ScenarioCode.GDFbPanelObjects1= [];
gdjs.ScenarioCode.GDTimerBgObjects1= [];
gdjs.ScenarioCode.GDTimerBarObjects1= [];
gdjs.ScenarioCode.GDVitalBar0Objects1= [];
gdjs.ScenarioCode.GDVitalBar1Objects1= [];
gdjs.ScenarioCode.GDVitalBar2Objects1= [];
gdjs.ScenarioCode.GDFreezePanelObjects1= [];
gdjs.ScenarioCode.GDExitBtnObjects1= [];
gdjs.ScenarioCode.GDMuteBtnObjects1= [];
gdjs.ScenarioCode.GDResetBtnObjects1= [];
gdjs.ScenarioCode.GDConfirmBtnObjects1= [];
gdjs.ScenarioCode.GDNextBtnObjects1= [];
gdjs.ScenarioCode.GDBtn0Objects1= [];
gdjs.ScenarioCode.GDBtn1Objects1= [];
gdjs.ScenarioCode.GDBtn2Objects1= [];
gdjs.ScenarioCode.GDBtn3Objects1= [];
gdjs.ScenarioCode.GDBtn4Objects1= [];
gdjs.ScenarioCode.GDWhoTextObjects1= [];
gdjs.ScenarioCode.GDBeatTextObjects1= [];
gdjs.ScenarioCode.GDHudTextObjects1= [];
gdjs.ScenarioCode.GDCounterTextObjects1= [];
gdjs.ScenarioCode.GDTimerTextObjects1= [];
gdjs.ScenarioCode.GDVitalTitleObjects1= [];
gdjs.ScenarioCode.GDVitalName0Objects1= [];
gdjs.ScenarioCode.GDVitalVal0Objects1= [];
gdjs.ScenarioCode.GDVitalName1Objects1= [];
gdjs.ScenarioCode.GDVitalVal1Objects1= [];
gdjs.ScenarioCode.GDVitalName2Objects1= [];
gdjs.ScenarioCode.GDVitalVal2Objects1= [];
gdjs.ScenarioCode.GDQuestionTextObjects1= [];
gdjs.ScenarioCode.GDSlotsTextObjects1= [];
gdjs.ScenarioCode.GDResetTextObjects1= [];
gdjs.ScenarioCode.GDFreezeTextObjects1= [];
gdjs.ScenarioCode.GDExitTextObjects1= [];
gdjs.ScenarioCode.GDMuteTextObjects1= [];
gdjs.ScenarioCode.GDConfirmTextObjects1= [];
gdjs.ScenarioCode.GDFbTitleObjects1= [];
gdjs.ScenarioCode.GDFbResultObjects1= [];
gdjs.ScenarioCode.GDFbProtoObjects1= [];
gdjs.ScenarioCode.GDFbGoldObjects1= [];
gdjs.ScenarioCode.GDNextTextObjects1= [];
gdjs.ScenarioCode.GDBtnText0Objects1= [];
gdjs.ScenarioCode.GDBtnText1Objects1= [];
gdjs.ScenarioCode.GDBtnText2Objects1= [];
gdjs.ScenarioCode.GDBtnText3Objects1= [];
gdjs.ScenarioCode.GDBtnText4Objects1= [];
gdjs.ScenarioCode.GDPresenterObjects1= [];


gdjs.ScenarioCode.userFunc0xa1ab10 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ============================================================
// CODE 7 — game engine for GDevelop (runs inside JsCode events)
// Faithful port of Mohamed's original Code 7 rules:
//  - timers: 20s choice / 35s ordering (x difficulty multiplier)
//  - points: 100 + round(frac*50) + min(streak-1,3)*10
//  - stars per scenario: frac>0.5 -> 3, >0.2 -> 2, else 1 (only if correct)
//  - levels: >=900 قائد ميدان, >=550 مسعف, >=250 متطوع, else مبتدئ
//  - round stars: ratio>=0.75 -> 3, >=0.45 -> 2, else 1
// ============================================================
if (!gdjs.__c7) {
  const C7 = (gdjs.__c7 = {});
  C7.data = {"meta":{"game":"CODE 7","version":"phase1","principles":["الإنسانية","عدم التحيّز","الحياد","الاستقلال","الخدمة التطوعية","الوحدة","العالمية"],"categories":{"aid":"إسعافات أولية","psy":"دعم نفسي","log":"لوجستيات وتوزيع","pri":"مبادئ الهلال","fld":"مواقف ميدانية","all":"المهمة الرئيسية"}},"principles":["الإنسانية","عدم التحيز","الحياد","الاستقلال","الخدمة التطوعية","الوحدة","العالمية"],"speech":"أهلاً بيك في الميدان. أنا حنين، قائدة المهمة، ومن اللحظة دي انت واحد من فريقي. هنا مفيش قرار صغير: كل ثانية بتفرق، وكل قرار صح معناه نبضة بتكمل. هدفنا واحد: نوصل بالمصاب ونبضه شغال. ركّز في المشهد، وثق في تدريبك، وقرّر بسرعة وبهدوء. القائد الحقيقي مش اللي ما بيغلطش أبدًا… القائد هو اللي بيتعلّم من كل قرار. يلا، المهمة بدأت.","scenarios":[{"id":1,"cat":"aid","type":"c","s":"مصاب بصدمة واشتباه إصابة داخلية، وحالته بتسوء.","q":"تعمل إيه؟","w":"الصدمة: تغطية وطمأنة، منع أي أكل أو شرب، وطلب الإسعاف فورًا. الماء والسكر ممكن يضر لو في إصابة داخلية.","g":"دفّي، طمّن، واتصل ١٢٣.","options":["تدفّيه وتطمّنه وتتصل بـ١٢٣ من غير أكل أو شرب","تديه ماء وسكر عشان يفوق","تقعّده وتخليه يتحرك","تسيبه لحد ما حالته تستقر"]},{"id":2,"cat":"aid","type":"c","s":"جرح بينزف بقوة في دراع زميل.","q":"أول تصرف؟","w":"الضغط المباشر المستمر بيوقف النزيف. لو القماشة اتبلّت زوّد فوقها قماشة من غير ما ترفع الأولى.","g":"اضغط… ومترفعش إيدك.","options":["تضغط مباشرة على الجرح بقماشة نظيفة وتفضل ضاغط","ترفع القماشة كل شوية تشوف النزيف وقف","تحط معجون أسنان على الجرح","تغسل الجرح وتسيبه ينزف"]},{"id":3,"cat":"aid","type":"c","s":"طفل إيده اتحرقت بمية سخنة.","q":"تعمل إيه؟","w":"المية الجارية العادية بتبرّد الحرق وتقلل التلف. التلج بيضر الجلد، والدهانات بتحبس الحرارة وتزوّد خطر العدوى.","g":"مية جارية… مش تلج.","options":["تبرّد مكان الحرق بمية جارية عادية ١٠ دقايق على الأقل","تحط تلج مباشرة على الحرق","تفقع الفقاعات","تدهن زبدة أو معجون أسنان"]},{"id":4,"cat":"aid","type":"o","s":"شخص واقع قدامك ومش بيستجيب.","q":"رتّب خطوات الإسعاف الصح","w":"أمانك الأول، بعدها الاستجابة، وطلب النجدة بدري، وبعدين التنفس والضغطات.","g":"آمن ← استجابة ← ١٢٣ ← تنفس ← ضغطات.","options":["اتأكد إن المكان آمن","اطمّن على استجابته","اطلب الإسعاف ١٢٣","افحص التنفس","ابدأ ضغطات الصدر"]},{"id":5,"cat":"psy","type":"c","s":"ناجٍ من حادث قاعد ساكت وبيرتعش.","q":"أنسب تصرف؟","w":"الإسعاف النفسي الأولي: حضور هادي وإحساس بالأمان من غير إجبار على الحكي.","g":"اسمع… ومتضغطش.","options":["تقعد جنبه بهدوء، وتطمّنه إنه في أمان، وتسمعه لو حب يتكلم","تقوله «اهدى مفيش حاجة» وتمشي","تلحّ عليه يحكي كل اللي حصل","تسيبه لوحده عشان ياخد راحته"]},{"id":6,"cat":"psy","type":"c","s":"طفل خايف في مركز الإيواء وبيعيّط.","q":"تتصرف إزاي؟","w":"الأطفال محتاجين أمان وروتين وكلام بسيط وصادق، واللعب بيساعدهم يعبّروا عن اللي جواهم.","g":"الأمان قبل الشرح.","options":["تكلّمه بهدوء وبكلام بسيط وصادق، وتشركه في لعبة أو نشاط","تقوله إن مفيش حاجة تخوّف خالص","تبعده عن أهله مؤقتًا","تتجاهل عياطه عشان يبطّل"]},{"id":7,"cat":"psy","type":"o","s":"أسرة متضررة محتاجة دعم نفسي أولي.","q":"رتّب خطوات الدعم النفسي الأولي","w":"بنبدأ بالأمان، بعدها نسمع، وبعدين نلبّي الاحتياجات ونوصّلهم للخدمات.","g":"شوف، اسمع، وصّل.","options":["اتأكد إن المكان آمن","قدّم نفسك واسمع بهدوء","اسأل عن احتياجاتهم الأساسية","اربطهم بالخدمات المناسبة"]},{"id":8,"cat":"log","type":"c","s":"عندك ١٠٠ بطانية و١٥٠ أسرة متضررة.","q":"أفضل طريقة للتوزيع؟","w":"التوزيع بيتبني على الاحتياج والأولوية وبكشوف واضحة، مش على القرب أو المعرفة.","g":"الاحتياج هو اللي يحدد.","options":["تحصر الأسر وتدّي الأولوية للأكثر احتياجًا وتوثّق كل حاجة","توزع على أول الواصلين","توزع على معارفك الأول","توقف التوزيع لحد ما تكمل الكمية"]},{"id":9,"cat":"log","type":"c","s":"مخزن فيه أدوية بتواريخ صلاحية مختلفة.","q":"تصرف الأدوية إزاي؟","w":"قاعدة الأقدم انتهاءً يخرج أول بتمنع إن الدواء يضيع.","g":"أقرب انتهاء… أول خروج.","options":["الأقرب انتهاءً يخرج الأول","الأحدث يخرج الأول","اللي في الإيد أول","بشكل عشوائي"]},{"id":10,"cat":"log","type":"o","s":"وصلت شحنة مساعدات للفرع.","q":"رتّب مراحل اللوجستيات","w":"التسلسل ده بيضمن إن المساعدات توصل للمستحق وبشفافية.","g":"سجّل قبل ما توزّع.","options":["استلم الشحنة وسجّلها","خزّنها مصنّفة","حدّد الأولويات حسب الاحتياج","وزّع بكشوف","وثّق واكتب تقرير"]},{"id":11,"cat":"pri","type":"p","s":"في طريق سفر شفت حادثة فيها مصابين، فوقفت تسعفهم.","q":"أنهي مبدأ ده؟","w":"الإنسانية: نمنع المعاناة ونخفّفها في أي مكان، ونحمي الحياة والصحة والكرامة.","g":"الألم مالوش هوية.","k":"الإنسانية"},{"id":12,"cat":"pri","type":"p","s":"قدامك مصاب قريب من أهلك حالته بسيطة، ومصاب غريب حالته خطيرة. بدأت بالغريب.","q":"أنهي مبدأ ده؟","w":"عدم التحيّز: مفيش تمييز بسبب الجنسية أو الدين أو الرأي، والأولوية للأخطر حالة.","g":"الأخطر أولًا.","k":"عدم التحيّز"},{"id":13,"cat":"pri","type":"p","s":"حصل خلاف كبير بين فريقين، وأسعفت المصابين من الطرفين من غير ما تاخد صف.","q":"أنهي مبدأ ده؟","w":"الحياد: مبنشتركش في العدائيات ولا الخلافات السياسية والدينية، عشان نفضل موثوقين.","g":"نساعد… ومنختارش صف.","k":"الحياد"},{"id":14,"cat":"pri","type":"p","s":"جهة عرضت تموّل نشاطك بشرط توجّهه لمصلحتها، فرفضت.","q":"أنهي مبدأ ده؟","w":"الاستقلال: بنحافظ على استقلال قرارنا عشان نشتغل دايمًا بمبادئ الحركة.","g":"التمويل مايشتريش القرار.","k":"الاستقلال"},{"id":15,"cat":"fld","type":"c","s":"عامل سقط من سقالة ارتفاعها 4 أمتار. عنده كسر مفتوح في الفخذ مع نزيف متوسط، وعلامات صدمة، واشتباه إصابة في العمود الفقري.","q":"إيه أول قرار صح؟","w":"تحريكه ممكن يحوّل إصابة العمود الفقري إلى شلل دائم. النزيف بنتعامل معاه في مكانه بالضغط المباشر، والصدمة بنعالجها بالتدفئة والثبات لحد ما توصل الإسعاف.","g":"المصاب ما بيتحركش… إيدك بس هي اللي تتحرك للنزيف.","options":["ما تحرّكهوش: ثبّت الرأس والرقبة، واضغط على النزيف في مكانه، وغطّيه عشان يدفى، وممنوع أكل وشرب، واتصل بـ123","ثبّت الكسر بجبيرة وحرّكه بعيدًا عن مكان الشغل، وبعدين انقله بعربية لأقرب مستشفى بسرعة","ادّيله مياه بسكر عشان الصدمة، وقعّده عشان يفوق ويتنفس أحسن","حرّكه على جنبه وابدأ تدليك للرجل المصابة عشان الدم يوصل لها"]},{"id":16,"cat":"fld","type":"c","s":"رجل رجليه الاتنين محشورين تحت بلاطة خرسانة من 90 دقيقة، وبيصرخ ويتوسّل تطلّعوه، ومعاك 6 متطوعين يقدروا يرفعوا البلاطة فعلًا.","q":"تعمل إيه؟","w":"بعد سحق طويل، رفع الضغط فجأة بيطلق سموم العضلات المسحوقة إلى الدم (متلازمة السحق) وممكن يوقف القلب. القرار هنا محتاج فريق طبي مجهّز قبل الرفع، مش قوة عضلات.","g":"الوقت بيقلب القرار: 10 دقائق غير 90 دقيقة.","options":["ما ترفعش الضغط قبل وصول الإسعاف أو الدفاع المدني — اتصل بـ123 وطّمنه وخليك جنبه","ارفعوا البلاطة بسرعة قبل ما رجليه تموت من قلة الدم","ارفعوا البلاطة على مراحل، شوية شوية، عشان جسمه يتعود","ادّيله مياه كتير يشربها عشان يعوّض ويستحمل لحد ما يطلع"]},{"id":17,"cat":"fld","type":"c","s":"حادث تصادم متعدد على طريق سريع: مصاب محشور في عربية مهشّمة وبينزف من صدره جامد، وريحة بنزين قوية، والعربيات لسه جاية بسرعتها وراك.","q":"أول خطوة؟","w":"منقذ مصاب أو ميت مش هينقذ حد. تأمين المشهد هو أول خطوة في أي استجابة دائمًا — قبل لمس المصاب نفسه — خصوصًا مع حركة مرور سريعة وخطر بنزين.","g":"أول مصاب في أي حادث… ما يكونش انت.","options":["أمّن المكان الأول: أوقف أو حوّل حركة العربيات الجاية وحط علامات تحذير، وبعدين اتعامل مع المصاب","اسحب المصاب من العربية فورًا قبل ما تحصل حريقة، وابدأ علاجه على الأسفلت","ابدأ الضغط على نزيف صدره وهو محشور عشان ما يخسرش دم أكتر","اركن عربيتك وراه وافتح الكشافات وابدأ العلاج وانت واقف بينه وبين الطريق"]},{"id":18,"cat":"fld","type":"c","s":"انفجار ماسورة ضغط في مصنع: عامل واعي وبيصرخ وبينزف جامد من جرح عميق في كف إيده اليمين، وزميله ربط عاصبة (تورنيكيه) مشدودة على فخده الشمال اللي مش بينزف.","q":"إيه الغلط اللي حصل؟","w":"النزيف الحقيقي في الكف وبيتعالج بالضغط المباشر والرفع والاتصال بـ123. العاصبة سلاح أخير لنزيف طرف بيهدد الحياة ومش بيقف بالضغط — مش رباط احتياطي يتحط على أي طرف.","g":"العاصبة آخر طلقة… مش أول رباط.","options":["الغلط هو العاصبة: اتربطت على طرف مش بينزف أصلًا، بينما النزيف الحقيقي في الكف متساب","إنهم ما غطّوش جرح الكف بشاش معقم قبل وصول الإسعاف","إن الزميل اتصرف من غير ما يستنى قائد الفريق","إنهم ما حطّوش تلج على جرح الكف عشان النزيف يقف بسرعة"]},{"id":19,"cat":"fld","type":"c","s":"انهيار جزئي لسقالة و3 مصابين، وفريقك 6 أفراد وحقيبة إسعاف واحدة والإسعاف بعد 20 دقيقة: واحد بيصرخ بكسر مفتوح في رجله، وواحد ساكت وشاحب وسيخ حديد نافذ من بطنه لضهره وبيتنفس بسرعة وسطحية، وواحد ماشي على رجليه بدراع مكسور ومصمم يتعالج الأول.","q":"تبدأ بمين؟","w":"اللي بيصرخ عايش وبيتنفس — مجرى هواه شغال بدليل صوته. اللي ساكت بيموت في صمت، والسيخ نفسه سادد النزيف فإياك تشيله؛ بنثبّته ونضغط حوالين الجرح مش عليه.","g":"الخطر الحقيقي ساكت… اللي بيصرخ لسه عايش.","options":["الساكت الأول: ثبّت السيخ في مكانه واضغط حوالين الجرح مش عليه وغطّيه، وزميل يضغط على نزيف اللي بيصرخ، وقعّد اللي ماشي في مكان آمن","اللي بيصرخ — كسره المفتوح أخطر حاجة شايفها، وصراخه بيوتّر الكل","اللي ماشي على رجليه — علاجه سريع وهيخلص ويقدر يساعدك بعدها","الساكت — بس شيل السيخ من بطنه الأول بسرعة واربط الجرح جامد قبل ما ينزف أكتر"]},{"id":20,"cat":"fld","type":"c","s":"صاعقة ضربت شجرة جنب 4 شباب في وادي: واحد بيصرخ وعنده حرق في دراعه، وبنت واقعة ساكتة مش بتتنفس ومفيش نبض محسوس وأطرافها زرقة وباردة، وواحد تايه سمعه ضعيف ورجليه منمّلة.","q":"تبدأ بمين وإزاي؟","w":"في الصواعق الترتيب بينعكس: قلب ضحية الصاعقة ممكن يرجع يشتغل لوحده، لكن التنفس لأ — فالإنعاش الفوري هو فرصتها. وضحية الصاعقة مش بتحمل شحنة، ولمسها آمن فورًا.","g":"ضحية الصاعقة مش بتشحّنك… تأخيرك هو الخطر.","options":["ابدأ بالبنت الساكتة فورًا: إنعاش قلبي رئوي وتنفس صناعي، وكمّل حتى لو النبض رجع لوحده","استنى بعيد عن البنت لحد ما تتأكد إن شحنة الصاعقة راحت من جسمها، وابدأ باللي بيصرخ","حط البنت على جنبها في وضع الإفاقة واستنى الإسعاف من غير تدخل","عالج حرق دراع اللي بيصرخ الأول لأنه صاحي وبيتألم، وبعدين شوف البنت"]}]};
  try {
    fetch("scenarios.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j && j.scenarios && j.scenarios.length) C7.data = j; })
      .catch(() => {});
  } catch (e) {}
  C7.CATS = { all: "المهمة الرئيسية", aid: "إسعافات أولية", psy: "دعم نفسي", log: "لوجستيات وتوزيع", pri: "مبادئ الهلال", fld: "مواقف ميدانية" };
  C7.CATKEYS = ["all", "aid", "psy", "log", "pri", "fld"];
  C7.ESC = {
    aid: "الحالة بتسوء قدام عينك… النبض بيضعف، والوقت بيجري.",
    fld: "الوضع بيتصعّد… وكل ثانية تأخير تمنها بيكبر.",
    psy: "التوتر بيزيد حوالينك… وحد هنا محتاج يحس بالأمان دلوقتي.",
    log: "الطابور بيطول والضغط بيزيد… والناس مستنية قرارك.",
    pri: "العيون كلها عليك… الشارة دي بتتكلم قبل ما تتكلم.",
  };
  C7.SCNIMG = { aid: ["aid", "aid2"], psy: ["psy", "psy2"], log: ["log", "log"], pri: ["pri", "pri"], fld: ["fld", "fld2"] };
  C7.IMGNAT = { aid: [1100, 733], aid2: [1100, 733], psy: [1100, 733], psy2: [1100, 733], log: [1100, 733], pri: [1100, 733], fld: [1099, 471], fld2: [1100, 733] };
  C7.LEADNAT = { Idle: [600, 1200], Focus: [512, 512], Serious: [512, 512], Proud: [512, 512], Celebrate: [512, 512], Welcome: [512, 512] };
  C7.DIFFS = [ { n: "هادئ", m: 1.6 }, { n: "ضغط", m: 1 }, { n: "كابوس", m: 0.55 } ];
  C7.sel = { cat: "all", diff: 1 };
  C7.snd = true;
  C7.round = null;
  C7.ar = (n) => String(Math.round(n)).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  C7.shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  C7.lv = (xp) => (xp >= 900 ? "قائد ميدان" : xp >= 550 ? "مسعف" : xp >= 250 ? "متطوع" : "مبتدئ");
  C7.now = () => performance.now();
  C7.obj = (rs, n) => { const a = rs.getObjects(n); return a && a.length ? a[0] : null; };
  C7.setText = (rs, n, s) => { const o = C7.obj(rs, n); if (o) o.setString(s); };
  C7.show = (rs, n, v) => { const o = C7.obj(rs, n); if (o) o.hide(!v); };
  C7.setAnim = (rs, n, a) => { const o = C7.obj(rs, n); if (o && o.getAnimationName() !== a) o.setAnimationName(a); };
  // ---- click handling (mouse + touch via the input manager) ----
  C7._prevDown = false;
  C7.clickEdge = (rs) => {
    const im = rs.getGame().getInputManager();
    const down = im.isMouseButtonPressed(0);
    const touch = im.getStartedTouchIdentifiers().length > 0;
    const edge = (down && !C7._prevDown) || touch;
    C7._prevDown = down;
    return edge;
  };
  C7.hit = (rs, name) => { const o = C7.obj(rs, name); return !!(o && !o.isHidden() && o.cursorOnObject()); };
  // ---- presenter: fit by height around a bottom-center anchor ----
  C7.leader = (rs, anim, cx, bottom, h, t) => {
    const p = C7.obj(rs, "Presenter"); if (!p) return;
    if (p.getAnimationName() !== anim) p.setAnimationName(anim);
    const nat = C7.LEADNAT[anim] || [288, 288];
    const nw = nat[0], nh = nat[1];
    let s = h / nh;
    if (anim === "Idle" || anim === "Welcome") s *= 1 + Math.sin(t / 620) * 0.008;
    p.setScaleX(1); p.setScaleY(1);
    p.setWidth(nw * s); p.setHeight(nh * s);
    const bob = anim === "Idle" || anim === "Welcome" ? Math.sin(t / 480) * 5 : 0;
    p.setX(cx - (nw * s) / 2); p.setY(bottom - nh * s + bob);
  };
  // ---- cover-fit a sprite into a box with a known natural size ----
  C7.cover = (o, nw, nh, bw, bh, cx, cy, k) => {
    const s = Math.max(bw / nw, bh / nh) * (k || 1);
    o.setScaleX(1); o.setScaleY(1);
    o.setWidth(nw * s); o.setHeight(nh * s);
    o.setX(cx - (nw * s) / 2); o.setY(cy - (nh * s) / 2);
    return s;
  };
  // ---- sound effects (real library files in assets — see build/SOUND-SOURCES.md) ----
  // snd-click / snd-correct / snd-wrong / snd-success / snd-fail: one-shots.
  // The heartbeat system (Mohamed's design, 2026-11-21): every pulse sound is cut
  // from ONE heart-monitor recording Mohamed supplied himself — steady beats that
  // slow down and finally stop. Three loop stages ride on channel 7 and follow the
  // decision clock (same 50% / 25% breaks as the timer bar colours):
  //   stage 0 "snd-heartbeat"       — steady lub-dub + monitor beep loop
  //   stage 1 "snd-heartbeat-slow"  — the recording's own slowing beats loop
  //   stage 2 "snd-heartbeat-dying" — the last strong beat + faint dying beeps loop
  // A wrong answer (or a timeout) stops the pulse and fires "snd-flatline" (the
  // recording's own flatline tone); a correct answer returns the pulse to steady.
  // Everything is gated by C7.snd (the 🔊/🔇 MuteBtn toggle on Start + Scenario).
  C7.play = (rs, name, vol) => {
    if (!C7.snd) return;
    try { gdjs.evtTools.sound.playSound(rs, name, false, vol == null ? 70 : vol, 1); } catch (e) {}
  };
  C7.HB_FILES = ["snd-heartbeat", "snd-heartbeat-slow", "snd-heartbeat-dying"];
  C7.hbPlay = (rs) => {
    if (!C7.snd) return;
    const st = rs.__s && rs.__s.hbStage ? rs.__s.hbStage : 0;
    try {
      gdjs.evtTools.sound.stopSoundOnChannel(rs, 7);
      gdjs.evtTools.sound.playSoundOnChannel(rs, C7.HB_FILES[st], 7, true, 100, 1);
    } catch (e) {}
  };
  C7.hbSetStage = (rs, stage) => {
    const S = rs.__s; if (!S || S.hbStage === stage) return;
    S.hbStage = stage;
    if (S.phase === "feedback" && S.lastOk === false) return; // pulse is dead — flatline already fired
    C7.hbPlay(rs);
  };
  C7.hbStop = (rs) => { try { gdjs.evtTools.sound.stopSoundOnChannel(rs, 7); } catch (e) {} };
  C7.buildPool = (cat) => {
    const all = (C7.data && C7.data.scenarios) || [];
    if (cat === "all") return C7.shuffle(all).slice(0, 6);
    return C7.shuffle(all.filter((z) => z.cat === cat));
  };
  C7.goto = (rs, name) => { try { gdjs.evtTools.runtimeScene.replaceScene(rs, name, true); } catch (e) {} };
  C7.fullscreen = () => { try { const d = document.documentElement; if (d.requestFullscreen) d.requestFullscreen(); } catch (e) {} };

  // ================= START SCENE =================
  C7.initStart = (rs) => {
    C7.hbStop(rs); // safety: the heartbeat loop belongs to the Scenario scene only
    const S = (rs.__s = { tw: 0, twStart: C7.now(), done: false });
    C7.setText(rs, "SubText", "محاكاة مواقف المتطوع — الهلال الأحمر المصري · فرع جنوب سيناء");
    C7.setText(rs, "NameText", "القائدة حنين");
    C7.setText(rs, "SpeechText", "");
    C7.setText(rs, "DiffLabel", "مستوى التحدي:");
    C7.DIFFS.forEach((d, i) => C7.setText(rs, "DiffText" + i, d.n));
    C7.CATKEYS.forEach((k, i) => {
      const n = k === "all" ? 6 : ((C7.data && C7.data.scenarios) || []).filter((z) => z.cat === k).length;
      C7.setText(rs, "CatText" + i, C7.CATS[k] + " · " + C7.ar(n) + (k === "all" ? " مواقف عشوائية" : " مواقف"));
    });
    C7.setText(rs, "StartText", "ابدأ المهمة");
    C7.setText(rs, "FsText", "⛶");
    C7.setText(rs, "MuteText", C7.snd ? "🔊" : "🔇");
    const bg = C7.obj(rs, "SceneBg");
    if (bg) { C7.cover(bg, 1100, 733, 720, 1280, 360, 640); bg.setOpacity(120); }
    const veil = C7.obj(rs, "Veil"); if (veil) veil.setOpacity(150);
    C7.startRefreshSel(rs);
  };
  C7.startRefreshSel = (rs) => {
    C7.CATKEYS.forEach((k, i) => C7.setAnim(rs, "CatBtn" + i, k === C7.sel.cat ? "gold" : "dark"));
    C7.DIFFS.forEach((d, i) => C7.setAnim(rs, "DiffBtn" + i, i === C7.sel.diff ? "red" : "dark"));
  };
  C7.tickStart = (rs) => {
    const S = rs.__s, t = C7.now();
    // typewriter speech
    const speech = (C7.data && C7.data.speech) || "";
    if (!S.done) {
      const n = Math.min(speech.length, Math.floor((t - S.twStart) / 26));
      C7.setText(rs, "SpeechText", speech.slice(0, n));
      if (n >= speech.length) S.done = true;
    }
    C7.leader(rs, "Idle", 360, 560, 400, t);
    const edge = C7.clickEdge(rs);
    if (!edge) return;
    if (C7.hit(rs, "SpeechPanel")) { C7.play(rs, "snd-click", 45); S.done = true; C7.setText(rs, "SpeechText", speech); }
    if (C7.hit(rs, "FsBtn")) { C7.play(rs, "snd-click", 55); return C7.fullscreen(); }
    if (C7.hit(rs, "MuteBtn")) { C7.snd = !C7.snd; C7.setText(rs, "MuteText", C7.snd ? "🔊" : "🔇"); if (C7.snd) C7.play(rs, "snd-click", 55); return; }
    for (let i = 0; i < 6; i++) if (C7.hit(rs, "CatBtn" + i)) { C7.play(rs, "snd-click", 55); C7.sel.cat = C7.CATKEYS[i]; return C7.startRefreshSel(rs); }
    for (let i = 0; i < 3; i++) if (C7.hit(rs, "DiffBtn" + i)) { C7.play(rs, "snd-click", 55); C7.sel.diff = i; return C7.startRefreshSel(rs); }
    if (C7.hit(rs, "StartBtn")) {
      C7.play(rs, "snd-click", 60);
      C7.round = { cat: C7.sel.cat, diff: C7.DIFFS[C7.sel.diff], pool: C7.buildPool(C7.sel.cat), i: 0, xp: 0, streak: 0, best: 0, stars: 0, res: [] };
      if (C7.round.pool.length) C7.goto(rs, "Scenario");
    }
  };

  // ================= SCENARIO SCENE =================
  C7.hud = (rs) => {
    const R = C7.round;
    C7.setText(rs, "HudText", "النقاط " + C7.ar(R.xp) + "  ·  المستوى " + C7.lv(R.xp) + "  ·  السلسلة " + C7.ar(R.streak) + " 🔥  ·  النجوم " + C7.ar(R.stars) + " ⭐");
    C7.setText(rs, "CounterText", "المشهد " + C7.ar(R.i + 1) + " من " + C7.ar(R.pool.length) + "  ·  " + C7.CATS[R.pool[R.i].cat]);
  };
  C7.startScenario = (rs) => {
    const R = C7.round, Z = R.pool[R.i], t = C7.now();
    const S = (rs.__s = { Z, phase: "beat1", t0: t, judged: false, shakeUntil: 0, kbDir: R.i % 2 ? -1 : 1, hbStage: 0 });
    R.Z = Z;
    S.tot = (Z.type === "o" ? 35 : 20) * R.diff.m;
    // scene image (color + gray twin)
    const arr = C7.SCNIMG[Z.cat] || C7.SCNIMG.aid;
    S.img = arr[R.i % arr.length];
    const img = C7.obj(rs, "SceneImg");
    if (img) {
      img.setAnimationName(S.img);
      const nat = C7.IMGNAT[S.img] || [1100, 733];
      S.nw = nat[0]; S.nh = nat[1];
      S.cover = Math.max(720 / S.nw, 600 / S.nh);
      C7.cover(img, S.nw, S.nh, 720, 600, 360, 300);
      img.setOpacity(255);
    }
    // build options
    if (Z.type === "o") {
      S.steps = C7.shuffle(Z.options.map((tx, ix) => ({ t: tx, pos: ix })));
      S.chosen = [];
    } else if (Z.type === "p") {
      const others = C7.shuffle(((C7.data && C7.data.principles) || []).filter((x) => x !== Z.k)).slice(0, 3);
      S.opts = C7.shuffle([Z.k].concat(others).map((tx) => ({ t: tx, ok: tx === Z.k })));
    } else {
      S.opts = C7.shuffle(Z.options.map((tx, ix) => ({ t: tx, ok: ix === 0 })));
    }
    // texts & visibility reset — choices stay hidden until the freeze beat
    C7.hud(rs);
    C7.setText(rs, "WhoText", "القائدة حنين — بتحطّك في المشهد");
    C7.setText(rs, "BeatText", Z.s);
    C7.setText(rs, "QuestionText", "");
    C7.show(rs, "CaptionPanel", true); C7.show(rs, "WhoText", true); C7.show(rs, "BeatText", true);
    C7.show(rs, "QuestionText", false);
    C7.setText(rs, "FreezeText", "❚❚ المشهد تجمّد — قرّر دلوقتي");
    C7.show(rs, "FreezePanel", false); C7.show(rs, "FreezeText", false);
    C7.show(rs, "Glow", true); const gl = C7.obj(rs, "Glow"); if (gl) gl.setOpacity(0);
    // vitals only for aid / fld — revealed at the freeze, in the caption band
    S.hasVitals = Z.cat === "aid" || Z.cat === "fld";
    ["VitalsPanel", "VitalTitle", "VitalName0", "VitalName1", "VitalName2", "VitalBar0", "VitalBar1", "VitalBar2", "VitalVal0", "VitalVal1", "VitalVal2"].forEach((n) => C7.show(rs, n, false));
    if (S.hasVitals) {
      S.vitals = [82, 76, 64]; S.vitalNames = ["الوعي", "التنفس", "السيطرة على النزيف"];
      S.vitalNames.forEach((n, i) => C7.setText(rs, "VitalName" + i, n));
      C7.setText(rs, "VitalTitle", "علامات المصاب");
    }
    // choice buttons: labels ready, all hidden until the decision beat
    S.nBtn = Z.type === "o" ? S.steps.length : S.opts.length;
    for (let i = 0; i < 5; i++) {
      C7.show(rs, "Btn" + i, false); C7.show(rs, "BtnText" + i, false);
      if (i < S.nBtn) { C7.setAnim(rs, "Btn" + i, "dark"); C7.setText(rs, "BtnText" + i, Z.type === "o" ? S.steps[i].t : S.opts[i].t); }
    }
    ["SlotsPanel", "SlotsText", "ResetBtn", "ResetText"].forEach((n) => C7.show(rs, n, false));
    C7.setText(rs, "ResetText", "↺ من الأول");
    C7.setText(rs, "SlotsText", "اضغط على الخطوات بالترتيب الصح…");
    C7.setText(rs, "ConfirmText", "تأكيد الترتيب");
    // reading beats: the scenario text stays on screen until the player taps
    // continue — the ConfirmBtn doubles as the continue button during the beats.
    C7.setText(rs, "ConfirmText", "فهمت، يلا »");
    C7.show(rs, "ConfirmBtn", true); C7.show(rs, "ConfirmText", true);
    S.showStory = false;
    // feedback hidden
    ["FbPanel", "FbTitle", "FbResult", "FbProto", "FbGold", "NextBtn", "NextText"].forEach((n) => C7.show(rs, n, false));
    C7.setText(rs, "MuteText", C7.snd ? "🔊" : "🔇");
    C7.setText(rs, "ExitText", "خروج");
    // timer bar full
    C7.scenarioTimerUI(rs, 1);
    C7.leader(rs, "Focus", 86, 1258, 148, t);
    // heartbeat loop runs for the whole scenario screen (beats + decision + feedback)
    C7.hbPlay(rs);
  };
  C7.scenarioTimerUI = (rs, frac) => {
    const bar = C7.obj(rs, "TimerBar"); if (!bar) return;
    bar.setWidth(Math.max(2, 672 * frac)); bar.setHeight(14);
    bar.setAnimationName(frac > 0.5 ? "green" : frac > 0.25 ? "gold" : "red");
    C7.setText(rs, "TimerText", C7.ar(Math.ceil(frac * ((rs.__s && rs.__s.tot) || 20))) + " ثانية");
  };
  C7.scenarioVitalsUI = (rs) => {
    const S = rs.__s; if (!S || !S.hasVitals) return;
    S.vitals.forEach((v, i) => {
      const b = C7.obj(rs, "VitalBar" + i); if (!b) return;
      b.setWidth(Math.max(2, 300 * (v / 100))); b.setHeight(12);
      b.setAnimationName(v > 50 ? "green" : v > 25 ? "gold" : "red");
      C7.setText(rs, "VitalVal" + i, C7.ar(v) + "٪");
    });
  };
  C7.judge = (rs, pick) => {
    const S = rs.__s, R = C7.round, Z = S.Z; if (!S || S.judged) return;
    S.judged = true; S.phase = "feedback";
    const late = pick === null;
    let ok = false;
    if (!late) ok = Z.type === "o" ? !!pick : !!S.opts[pick].ok;
    const frac = S.deadline ? Math.max(0, (S.deadline - C7.now()) / (S.tot * 1000)) : 1;
    let pts = 0, stars = 0;
    if (ok) { R.streak++; R.best = Math.max(R.best, R.streak); pts = 100 + Math.round(frac * 50) + Math.min(R.streak - 1, 3) * 10; stars = frac > 0.5 ? 3 : frac > 0.2 ? 2 : 1; }
    else R.streak = 0;
    R.xp += pts; R.stars += stars; R.res.push(ok);
    S.lastOk = ok;
    if (ok) {
      // correct: the confirm sting plays and the pulse returns to its steady,
      // regular rhythm underneath — the patient is stable again.
      C7.hbSetStage(rs, 0);
      C7.play(rs, "snd-correct", 70);
    } else {
      // wrong (or time out): the pulse stops — flatline moment.
      C7.hbStop(rs);
      C7.play(rs, "snd-wrong", 40);
      C7.play(rs, "snd-flatline", 100);
    }
    // button colors
    if (Z.type !== "o") S.opts.forEach((o, i) => { if (o.ok) C7.setAnim(rs, "Btn" + i, "green"); else if (i === pick) C7.setAnim(rs, "Btn" + i, "orange"); });
    else { C7.show(rs, "ConfirmBtn", false); C7.show(rs, "ConfirmText", false); }
    if (!ok) S.shakeUntil = C7.now() + 380;
    const gl = C7.obj(rs, "Glow"); if (gl) gl.setOpacity(ok ? 0 : 110);
    // feedback panel
    C7.hud(rs);
    ["FbPanel", "FbTitle", "FbResult", "FbProto", "FbGold", "NextBtn", "NextText"].forEach((n) => C7.show(rs, n, true));
    C7.setText(rs, "FbTitle", late ? "الوقت خلص" : ok ? "قرار صح" : "قرار محتاج مراجعة");
    C7.setText(rs, "FbResult", ok ? "+" + C7.ar(pts) + " نقطة، و" + C7.ar(stars) + " نجوم" : "من غير نقاط في الموقف ده");
    C7.setText(rs, "FbProto", Z.w + (Z.type === "o" && !ok ? "\nالترتيب الصح: " + Z.options.join(" ← ") : ""));
    C7.setText(rs, "FbGold", "⭐ " + Z.g);
    const last = R.i >= R.pool.length - 1;
    C7.setText(rs, "NextText", last ? "شوف النتيجة" : "المشهد التالي");
    C7.setAnim(rs, "NextBtn", ok ? "green" : "red");
    C7.leader(rs, ok ? "Proud" : "Serious", 86, 1258, 148, C7.now());
  };
  C7.enterDecision = (rs) => {
    const S = rs.__s, Z = S.Z, t = C7.now();
    S.phase = "decision"; S.t0 = t; S.lastTick = t;
    // ordering scenarios: the clock starts at the first step picked,
    // so the steps can be read first with no timer running.
    S.deadline = Z.type === "o" ? 0 : t + S.tot * 1000;
    const img = C7.obj(rs, "SceneImg");
    if (img) img.setAnimationName(S.img + "_gray");
    C7.show(rs, "FreezePanel", true); C7.show(rs, "FreezeText", true);
    C7.show(rs, "ConfirmBtn", false); C7.show(rs, "ConfirmText", false);
    C7.setText(rs, "ConfirmText", "تأكيد الترتيب");
    // the scenario text stays readable during the decision: it remains in the
    // caption band for non-vitals categories; for aid/fld the band carries the
    // vitals and tapping the band toggles between vitals and the scenario text.
    C7.setText(rs, "BeatText", Z.s);
    if (S.hasVitals) {
      C7.show(rs, "CaptionPanel", false); C7.show(rs, "WhoText", false); C7.show(rs, "BeatText", false);
      ["VitalsPanel", "VitalTitle", "VitalName0", "VitalName1", "VitalName2", "VitalBar0", "VitalBar1", "VitalBar2", "VitalVal0", "VitalVal1", "VitalVal2"].forEach((n) => C7.show(rs, n, true));
    }
    C7.setText(rs, "QuestionText", "ده انت… " + (Z.q || ""));
    C7.show(rs, "QuestionText", true);
    const ord = Z.type === "o";
    for (let i = 0; i < S.nBtn; i++) {
      const b = C7.obj(rs, "Btn" + i), tx = C7.obj(rs, "BtnText" + i);
      const y = ord ? 876 + i * 64 : 736 + i * 76, h = ord ? 56 : 64;
      if (b) { b.setY(y); b.setHeight(h); }
      if (tx) tx.setY(y + (ord ? 8 : 10));
      C7.show(rs, "Btn" + i, true); C7.show(rs, "BtnText" + i, true);
    }
    if (ord) { C7.show(rs, "SlotsPanel", true); C7.show(rs, "SlotsText", true); C7.show(rs, "ResetBtn", true); C7.show(rs, "ResetText", true); }
    C7.scenarioVitalsUI(rs);
  };
  C7.tickScenario = (rs) => {
    const R = C7.round; if (!R || !R.pool || !R.pool.length) return C7.goto(rs, "Start");
    const S = rs.__s; if (!S) return C7.startScenario(rs);
    const t = C7.now(), Z = S.Z;
    // camera shake on wrong answers
    const layer = rs.getLayer("");
    if (t < S.shakeUntil) { layer.setCameraX(360 + (Math.random() * 14 - 7)); layer.setCameraY(640 + (Math.random() * 10 - 5)); }
    else { layer.setCameraX(360); layer.setCameraY(640); }
    // presenter per phase
    if (S.phase !== "feedback") C7.leader(rs, "Focus", 86, 1258, 148, t);
    // Ken Burns during beats
    const img = C7.obj(rs, "SceneImg");
    if (img && (S.phase === "beat1" || S.phase === "beat2")) {
      const p = Math.min(1, (t - S.t0) / 2300);
      const sc = S.cover * (1 + 0.07 * p);
      img.setScaleX(1); img.setScaleY(1);
      img.setWidth(S.nw * sc); img.setHeight(S.nh * sc);
      img.setX(360 - (S.nw * sc) / 2 + S.kbDir * 14 * p); img.setY(300 - (S.nh * sc) / 2);
    }
    // the reading beats (beat1/beat2) never advance on their own — the player
    // reads at his own pace and taps the continue button (see input below).
    if (S.phase === "decision") {
      // the decision clock runs only once started (see enterDecision / first step)
      const frac = S.deadline ? Math.max(0, (S.deadline - t) / (S.tot * 1000)) : 1;
      C7.scenarioTimerUI(rs, frac);
      // the pulse follows the clock: steady above half time, slowing under it,
      // dying in the last quarter (same breaks as the timer bar colours).
      C7.hbSetStage(rs, frac > 0.5 ? 0 : frac > 0.25 ? 1 : 2);
      if (!S.deadline) C7.setText(rs, "TimerText", "اقرأ الخطوات… المؤقّت يبدأ مع أول خطوة");
      const gl = C7.obj(rs, "Glow"); if (gl) gl.setOpacity(Math.round((1 - frac) * 150 + Math.sin(t / 160) * 18));
      if (S.hasVitals && S.deadline) {
        const dt = Math.min(50, t - (S.lastTick || t)); S.lastTick = t;
        const rates = [14, 20, 30];
        S.vitals = S.vitals.map((v, i) => Math.max(8, v - (rates[i] * dt) / (S.tot * 1000)));
        C7.scenarioVitalsUI(rs);
      }
      if (S.deadline && frac <= 0) return C7.judge(rs, null);
    }
    // input
    const edge = C7.clickEdge(rs);
    if (!edge) return;
    if (C7.hit(rs, "MuteBtn")) { C7.snd = !C7.snd; C7.setText(rs, "MuteText", C7.snd ? "🔊" : "🔇"); if (C7.snd) { C7.play(rs, "snd-click", 55); if (!(S.phase === "feedback" && S.lastOk === false)) C7.hbPlay(rs); } else C7.hbStop(rs); return; }
    if (C7.hit(rs, "ExitBtn")) { C7.play(rs, "snd-click", 55); C7.hbStop(rs); C7.round = null; return C7.goto(rs, "Start"); }
    if (S.phase === "feedback") {
      if (C7.hit(rs, "NextBtn")) {
        C7.play(rs, "snd-click", 55);
        R.i++;
        if (R.i >= R.pool.length) { C7.hbStop(rs); return C7.goto(rs, "Results"); }
        return C7.startScenario(rs);
      }
      return;
    }
    if (S.phase === "beat1" || S.phase === "beat2") {
      if (C7.hit(rs, "ConfirmBtn")) {
        C7.play(rs, "snd-click", 55);
        if (S.phase === "beat1") {
          S.phase = "beat2"; S.t0 = t;
          C7.setText(rs, "BeatText", C7.ESC[Z.cat] || Z.s);
          C7.setText(rs, "ConfirmText", "قرّر دلوقتي »");
        } else {
          return C7.enterDecision(rs);
        }
      }
      return;
    }
    if (S.phase !== "decision" || S.judged) return;
    // aid/fld: tap the caption band to swap between the vitals and the scenario text
    if (S.hasVitals) {
      if (!S.showStory && C7.hit(rs, "VitalsPanel")) {
        S.showStory = true;
        ["VitalsPanel", "VitalTitle", "VitalName0", "VitalName1", "VitalName2", "VitalBar0", "VitalBar1", "VitalBar2", "VitalVal0", "VitalVal1", "VitalVal2"].forEach((n) => C7.show(rs, n, false));
        C7.show(rs, "CaptionPanel", true); C7.show(rs, "WhoText", true); C7.show(rs, "BeatText", true);
        return;
      }
      if (S.showStory && C7.hit(rs, "CaptionPanel")) {
        S.showStory = false;
        C7.show(rs, "CaptionPanel", false); C7.show(rs, "WhoText", false); C7.show(rs, "BeatText", false);
        ["VitalsPanel", "VitalTitle", "VitalName0", "VitalName1", "VitalName2", "VitalBar0", "VitalBar1", "VitalBar2", "VitalVal0", "VitalVal1", "VitalVal2"].forEach((n) => C7.show(rs, n, true));
        C7.scenarioVitalsUI(rs);
        return;
      }
    }
    if (Z.type === "o") {
      if (C7.hit(rs, "ResetBtn")) {
        C7.play(rs, "snd-click", 55);
        S.chosen = [];
        for (let i = 0; i < S.steps.length; i++) { C7.show(rs, "Btn" + i, true); C7.show(rs, "BtnText" + i, true); C7.setAnim(rs, "Btn" + i, "dark"); }
        C7.setText(rs, "SlotsText", "اضغط على الخطوات بالترتيب الصح…");
        C7.show(rs, "ConfirmBtn", false); C7.show(rs, "ConfirmText", false);
        return;
      }
      for (let i = 0; i < S.steps.length; i++) {
        if (C7.hit(rs, "Btn" + i)) {
          C7.play(rs, "snd-click", 55);
          if (!S.deadline) { const nt = C7.now(); S.deadline = nt + S.tot * 1000; S.lastTick = nt; }
          S.chosen.push(S.steps[i]);
          C7.show(rs, "Btn" + i, false); C7.show(rs, "BtnText" + i, false);
          C7.setText(rs, "SlotsText", S.chosen.map((c, ix) => C7.ar(ix + 1) + ". " + c.t).join("\n"));
          if (S.chosen.length === S.steps.length) { C7.show(rs, "ConfirmBtn", true); C7.show(rs, "ConfirmText", true); }
          return;
        }
      }
      if (C7.hit(rs, "ConfirmBtn")) {
        const good = S.chosen.every((c, ix) => c.pos === ix);
        return C7.judge(rs, good);
      }
    } else {
      for (let i = 0; i < S.opts.length; i++) if (C7.hit(rs, "Btn" + i)) return C7.judge(rs, i);
    }
  };

  // ================= RESULTS SCENE =================
  C7.initResults = (rs) => {
    C7.hbStop(rs); // the heartbeat stops at the results, as designed
    const R = C7.round || { cat: "all", pool: [], xp: 0, stars: 0, res: [], best: 0 };
    const n = Math.max(1, R.pool.length);
    const ratio = R.stars / (3 * n);
    const r = ratio >= 0.75 ? 3 : ratio >= 0.45 ? 2 : 1;
    rs.__s = { t0: C7.now(), xp: R.xp, shown: -1 };
    C7.setText(rs, "ResTitle", "نتيجة " + (C7.CATS[R.cat] || ""));
    C7.setText(rs, "BigScore", "٠");
    C7.setText(rs, "LevelText", "المستوى: " + C7.lv(R.xp));
    const acc = R.res.filter(Boolean).length;
    C7.setText(rs, "SummaryText", C7.ar(acc) + " من " + C7.ar(R.pool.length) + " صح · أفضل سلسلة " + C7.ar(R.best));
    C7.setText(rs, "RowsText", R.pool.map((z, j) => (C7.CATS[z.cat] || "") + " — " + (R.res[j] ? "صح ✓" : "غلط ✗")).join("\n"));
    for (let i = 0; i < 3; i++) C7.setAnim(rs, "Star" + i, i < r ? "gold" : "gray");
    C7.setText(rs, "AgainText", "العب تاني");
    C7.setText(rs, "HomeText", "كل المهام");
    const bg = C7.obj(rs, "SceneBg");
    if (bg) { C7.cover(bg, 1100, 733, 720, 1280, 360, 640); bg.setOpacity(110); }
    const veil = C7.obj(rs, "Veil"); if (veil) veil.setOpacity(165);
    rs.__r = r;
    // mission-end sting: success melody at 2+ stars, descending tone below that
    C7.play(rs, r >= 2 ? "snd-success" : "snd-fail", 75);
  };
  C7.tickResults = (rs) => {
    const S = rs.__s, t = C7.now(); if (!S) return;
    const p = Math.min(1, (t - S.t0) / 900);
    const val = Math.round(S.xp * p);
    if (val !== S.shown) { S.shown = val; C7.setText(rs, "BigScore", C7.ar(val)); }
    for (let i = 0; i < 3; i++) {
      const st = C7.obj(rs, "Star" + i); if (!st) continue;
      const on = i < (rs.__r || 1);
      const sp = Math.min(1, Math.max(0, (t - S.t0 - 350 - i * 260) / 300));
      const sz = 92 * (on ? 0.4 + 0.6 * sp : 0.72);
      st.setScaleX(1); st.setScaleY(1);
      st.setWidth(sz); st.setHeight(sz);
      const cx = [260, 360, 460][i];
      st.setX(cx - sz / 2); st.setY(376 - sz / 2);
    }
    C7.leader(rs, (rs.__r || 1) >= 2 ? "Celebrate" : "Welcome", 628, 300, 168, t);
    const edge = C7.clickEdge(rs);
    if (!edge) return;
    if (C7.hit(rs, "AgainBtn")) {
      C7.play(rs, "snd-click", 55);
      const cat = C7.round ? C7.round.cat : "all";
      C7.round = { cat, diff: C7.round ? C7.round.diff : C7.DIFFS[C7.sel.diff], pool: C7.buildPool(cat), i: 0, xp: 0, streak: 0, best: 0, stars: 0, res: [] };
      if (C7.round.pool.length) C7.goto(rs, "Scenario");
    }
    if (C7.hit(rs, "HomeBtn")) { C7.play(rs, "snd-click", 55); return C7.goto(rs, "Start"); }
  };
}

// ---- per-scene dispatch (runs every frame of every scene) ----
(function () {
  const C7 = gdjs.__c7;
  const rs = runtimeScene;
  const name = rs.getName();
  if (name === "Start") { if (!rs.__s) C7.initStart(rs); C7.tickStart(rs); }
  else if (name === "Scenario") { C7.tickScenario(rs); }
  else if (name === "Results") { if (!rs.__s) C7.initResults(rs); C7.tickResults(rs); }
})();

};
gdjs.ScenarioCode.eventsList0 = function(runtimeScene) {

{


gdjs.ScenarioCode.userFunc0xa1ab10(runtimeScene);

}


};

gdjs.ScenarioCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.ScenarioCode.GDSceneImgObjects1.length = 0;
gdjs.ScenarioCode.GDGlowObjects1.length = 0;
gdjs.ScenarioCode.GDCaptionPanelObjects1.length = 0;
gdjs.ScenarioCode.GDVitalsPanelObjects1.length = 0;
gdjs.ScenarioCode.GDHudPanelObjects1.length = 0;
gdjs.ScenarioCode.GDSlotsPanelObjects1.length = 0;
gdjs.ScenarioCode.GDFbPanelObjects1.length = 0;
gdjs.ScenarioCode.GDTimerBgObjects1.length = 0;
gdjs.ScenarioCode.GDTimerBarObjects1.length = 0;
gdjs.ScenarioCode.GDVitalBar0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalBar1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalBar2Objects1.length = 0;
gdjs.ScenarioCode.GDFreezePanelObjects1.length = 0;
gdjs.ScenarioCode.GDExitBtnObjects1.length = 0;
gdjs.ScenarioCode.GDMuteBtnObjects1.length = 0;
gdjs.ScenarioCode.GDResetBtnObjects1.length = 0;
gdjs.ScenarioCode.GDConfirmBtnObjects1.length = 0;
gdjs.ScenarioCode.GDNextBtnObjects1.length = 0;
gdjs.ScenarioCode.GDBtn0Objects1.length = 0;
gdjs.ScenarioCode.GDBtn1Objects1.length = 0;
gdjs.ScenarioCode.GDBtn2Objects1.length = 0;
gdjs.ScenarioCode.GDBtn3Objects1.length = 0;
gdjs.ScenarioCode.GDBtn4Objects1.length = 0;
gdjs.ScenarioCode.GDWhoTextObjects1.length = 0;
gdjs.ScenarioCode.GDBeatTextObjects1.length = 0;
gdjs.ScenarioCode.GDHudTextObjects1.length = 0;
gdjs.ScenarioCode.GDCounterTextObjects1.length = 0;
gdjs.ScenarioCode.GDTimerTextObjects1.length = 0;
gdjs.ScenarioCode.GDVitalTitleObjects1.length = 0;
gdjs.ScenarioCode.GDVitalName0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalName1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalName2Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal2Objects1.length = 0;
gdjs.ScenarioCode.GDQuestionTextObjects1.length = 0;
gdjs.ScenarioCode.GDSlotsTextObjects1.length = 0;
gdjs.ScenarioCode.GDResetTextObjects1.length = 0;
gdjs.ScenarioCode.GDFreezeTextObjects1.length = 0;
gdjs.ScenarioCode.GDExitTextObjects1.length = 0;
gdjs.ScenarioCode.GDMuteTextObjects1.length = 0;
gdjs.ScenarioCode.GDConfirmTextObjects1.length = 0;
gdjs.ScenarioCode.GDFbTitleObjects1.length = 0;
gdjs.ScenarioCode.GDFbResultObjects1.length = 0;
gdjs.ScenarioCode.GDFbProtoObjects1.length = 0;
gdjs.ScenarioCode.GDFbGoldObjects1.length = 0;
gdjs.ScenarioCode.GDNextTextObjects1.length = 0;
gdjs.ScenarioCode.GDBtnText0Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText1Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText2Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText3Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText4Objects1.length = 0;
gdjs.ScenarioCode.GDPresenterObjects1.length = 0;

gdjs.ScenarioCode.eventsList0(runtimeScene);
gdjs.ScenarioCode.GDSceneImgObjects1.length = 0;
gdjs.ScenarioCode.GDGlowObjects1.length = 0;
gdjs.ScenarioCode.GDCaptionPanelObjects1.length = 0;
gdjs.ScenarioCode.GDVitalsPanelObjects1.length = 0;
gdjs.ScenarioCode.GDHudPanelObjects1.length = 0;
gdjs.ScenarioCode.GDSlotsPanelObjects1.length = 0;
gdjs.ScenarioCode.GDFbPanelObjects1.length = 0;
gdjs.ScenarioCode.GDTimerBgObjects1.length = 0;
gdjs.ScenarioCode.GDTimerBarObjects1.length = 0;
gdjs.ScenarioCode.GDVitalBar0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalBar1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalBar2Objects1.length = 0;
gdjs.ScenarioCode.GDFreezePanelObjects1.length = 0;
gdjs.ScenarioCode.GDExitBtnObjects1.length = 0;
gdjs.ScenarioCode.GDMuteBtnObjects1.length = 0;
gdjs.ScenarioCode.GDResetBtnObjects1.length = 0;
gdjs.ScenarioCode.GDConfirmBtnObjects1.length = 0;
gdjs.ScenarioCode.GDNextBtnObjects1.length = 0;
gdjs.ScenarioCode.GDBtn0Objects1.length = 0;
gdjs.ScenarioCode.GDBtn1Objects1.length = 0;
gdjs.ScenarioCode.GDBtn2Objects1.length = 0;
gdjs.ScenarioCode.GDBtn3Objects1.length = 0;
gdjs.ScenarioCode.GDBtn4Objects1.length = 0;
gdjs.ScenarioCode.GDWhoTextObjects1.length = 0;
gdjs.ScenarioCode.GDBeatTextObjects1.length = 0;
gdjs.ScenarioCode.GDHudTextObjects1.length = 0;
gdjs.ScenarioCode.GDCounterTextObjects1.length = 0;
gdjs.ScenarioCode.GDTimerTextObjects1.length = 0;
gdjs.ScenarioCode.GDVitalTitleObjects1.length = 0;
gdjs.ScenarioCode.GDVitalName0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal0Objects1.length = 0;
gdjs.ScenarioCode.GDVitalName1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal1Objects1.length = 0;
gdjs.ScenarioCode.GDVitalName2Objects1.length = 0;
gdjs.ScenarioCode.GDVitalVal2Objects1.length = 0;
gdjs.ScenarioCode.GDQuestionTextObjects1.length = 0;
gdjs.ScenarioCode.GDSlotsTextObjects1.length = 0;
gdjs.ScenarioCode.GDResetTextObjects1.length = 0;
gdjs.ScenarioCode.GDFreezeTextObjects1.length = 0;
gdjs.ScenarioCode.GDExitTextObjects1.length = 0;
gdjs.ScenarioCode.GDMuteTextObjects1.length = 0;
gdjs.ScenarioCode.GDConfirmTextObjects1.length = 0;
gdjs.ScenarioCode.GDFbTitleObjects1.length = 0;
gdjs.ScenarioCode.GDFbResultObjects1.length = 0;
gdjs.ScenarioCode.GDFbProtoObjects1.length = 0;
gdjs.ScenarioCode.GDFbGoldObjects1.length = 0;
gdjs.ScenarioCode.GDNextTextObjects1.length = 0;
gdjs.ScenarioCode.GDBtnText0Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText1Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText2Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText3Objects1.length = 0;
gdjs.ScenarioCode.GDBtnText4Objects1.length = 0;
gdjs.ScenarioCode.GDPresenterObjects1.length = 0;


return;

}

gdjs['ScenarioCode'] = gdjs.ScenarioCode;
