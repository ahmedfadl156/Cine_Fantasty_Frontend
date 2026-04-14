"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Lock, Trophy, Users, Info, ArrowRight, ArrowLeft, CalendarDays, Medal, Archive } from "lucide-react";

export default function HowItWorksPage() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const isAr = lang === "ar";

  const content = {
    en: {
      title: "Studio Head's Guide: Cinema Fantasy League",
      intro: (
        <>
          <p className="mb-2">Welcome to Hollywood! Here, you are not just a spectator, you are a <strong className="text-emerald-400">"Movie Studio Head."</strong></p>
          <p className="mb-2">Your mission is to read the market, discover blockbusters before they are released, and achieve the highest market value for your studio to top the list of the world's best producers.</p>
          <p className="text-amber-400 mt-4 font-semibold text-lg">Here are the golden rules to jumpstart your journey to cinematic glory:</p>
        </>
      ),
      steps: [
        {
          id: 1,
          icon: <CalendarDays className="w-8 h-8 text-cyan-400" />,
          title: "1. The Seasons - New Update",
          content: (
            <div className="space-y-3 text-zinc-300">
              <p>The game is now based on cinematic seasons (e.g., Summer Blockbuster Season, Awards Season).</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                <li>Each season has a specific start and end date.</li>
                <li>At the beginning of each season, budgets are reset for all players so competition starts entirely from scratch with absolute fairness.</li>
                <li>After a season ends, your studio is archived in the "Hall of Fame," and you begin a new season with a fresh budget.</li>
              </ul>
            </div>
          ),
          accent: "from-cyan-500/20 to-transparent",
          border: "border-cyan-500/30"
        },
        {
          id: 2,
          icon: <Coins className="w-8 h-8 text-emerald-400" />,
          title: "2. The Starting Budget",
          content: (
            <div className="space-y-2 text-zinc-300 pr-0 md:pr-4">
              <p>With the launch of every new season, investors grant you <strong className="text-emerald-400">$400 million</strong> (virtual cash) in your studio's wallet for that season.</p>
              <p>Use this cash to buy the distribution rights for movies you expect to succeed.</p>
            </div>
          ),
          accent: "from-emerald-500/20 to-transparent",
          border: "border-emerald-500/30"
        },
        {
          id: 3,
          icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
          title: "3. The Market & Dynamic Pricing",
          content: (
            <div className="space-y-4 text-zinc-300">
              <p>The market only displays movies scheduled to be released within the current season's timeframe.</p>
              <div className="bg-blue-950/40 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-300 mb-2 font-semibold flex items-center gap-2"><Info className="w-5 h-5"/> Prices are highly variable!</p>
                <p className="text-sm leading-relaxed">Our system monitors the global "trend" and "hype" for each movie in real-time.</p>
              </div>
              <p><strong className="text-amber-400">The Hype Rule:</strong> If a movie generates a lot of buzz and a strong trailer drops, its price will rise. If enthusiasm fades, its price may drop!</p>
              <p><strong className="text-blue-400">Pro Tip:</strong> Exploit price fluctuations and buy movies at their lowest price before their popularity explodes. (Prices range between a minimum of $10 million and a maximum of $300 million).</p>
            </div>
          ),
          accent: "from-blue-500/20 to-transparent",
          border: "border-blue-500/30"
        },
        {
          id: 4,
          icon: <Lock className="w-8 h-8 text-red-400" />,
          title: "4. The Deadline",
          content: (
            <div className="space-y-2 text-zinc-300">
              <p>As soon as the movie is officially screened in real-life theaters (status changes to IN_THEATERS), purchasing is immediately locked.</p>
              <p className="text-red-300 bg-red-950/20 p-3 rounded-lg border border-red-500/10">You won't be able to buy the movie after its theatrical release, and you cannot undo or sell a movie you've already purchased. Your decision is final once the movie is released!</p>
            </div>
          ),
          accent: "from-red-500/20 to-transparent",
          border: "border-red-500/30"
        },
        {
          id: 5,
          icon: <Trophy className="w-8 h-8 text-amber-400" />,
          title: "5. Net Worth & Scoring",
          content: (
            <div className="space-y-4 text-zinc-300">
              <p>Ranking in the game is not based on points, but on your studio's <strong className="text-amber-400">"Net Worth"</strong> (Market Value).</p>
              <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 font-mono text-sm shadow-inner">
                <span className="text-amber-400 font-semibold">Net Worth</span> = (Remaining Cash) + (Real Box Office Revenues)
              </div>
              <div className="bg-emerald-950/20 border-l-2 border-emerald-500 p-4 text-emerald-300 text-sm">
                Box Office revenues are updated daily based on real-world numbers. Every dollar a movie makes in reality is directly added to your Net Worth in the game!
              </div>
            </div>
          ),
          accent: "from-amber-500/20 to-transparent",
          border: "border-amber-500/30"
        },
        {
          id: 6,
          icon: <Users className="w-8 h-8 text-purple-400" />,
          title: "6. Competitive Leagues",
          content: (
            <div className="space-y-3 text-zinc-300">
              <p>Competing with friends is the core of the game:</p>
              <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-sm">
                <li>You can create a private league or join public leagues (max 100 members).</li>
                <li><strong className="text-purple-300">Ownership Rule:</strong> You can own up to 3 private leagues per season.</li>
                <li>Leagues are tied to the season; once the season ends, the final leaderboard is announced, and the champion is crowned.</li>
              </ul>
            </div>
          ),
          accent: "from-purple-500/20 to-transparent",
          border: "border-purple-500/30"
        },
        {
          id: 7,
          icon: <Medal className="w-8 h-8 text-yellow-500" />,
          title: "7. Final Rank & Archive",
          content: (
            <div className="space-y-2 text-zinc-300">
              <p>When a season closes, the <strong className="text-yellow-500">Final Rank</strong> for all players is calculated and saved on your profile forever.</p>
              <p className="text-lg text-white font-semibold mt-4">Who will claim the title of "Best Producer of 2026"?</p>
            </div>
          ),
          accent: "from-yellow-500/20 to-transparent",
          border: "border-yellow-500/30"
        }
      ],
      footer: "(Notice to Management: This guide is the official reference for players and will be updated automatically as new features or power-ups are added.)\n\nAre you ready to build your cinematic empire? 🎥✨"
    },
    ar: {
      title: "🎬 دليل رئيس الاستوديو: قواعد Cinema Fantasy League",
      intro: (
        <>
          <p className="mb-2 text-xl">أهلاً بك في هوليوود! هنا، أنت لست مجرد مشاهد، أنت <strong className="text-emerald-400">"رئيس استوديو سينمائي".</strong></p>
          <p className="mb-2">مهمتك هي قراءة السوق، اكتشاف الأفلام الناجحة قبل صدورها، وتحقيق أعلى قيمة سوقية لاستوديوك لتتصدر قائمة أفضل المنتجين في العالم.</p>
          <p className="text-amber-400 mt-4 font-semibold text-lg">إليك القواعد الذهبية لتبدأ رحلتك نحو المجد السينمائي:</p>
        </>
      ),
      steps: [
        {
          id: 1,
          icon: <CalendarDays className="w-8 h-8 text-cyan-400" />,
          title: "1. نظام المواسم (The Seasons) - تحديث جديد",
          content: (
            <div className="space-y-3 text-zinc-300">
              <p>اللعبة الآن تعتمد على المواسم السينمائية (مثل: موسم أفلام الصيف، موسم الجوائز).</p>
              <ul className="list-disc pr-5 space-y-1 text-zinc-400">
                <li>كل موسم له بداية ونهاية محددة.</li>
                <li>في بداية كل موسم، يتم تصفير الميزانيات لجميع اللاعبين لتبدأ المنافسة من نقطة الصفر بعدالة تامة.</li>
                <li>بعد نهاية الموسم، يتم أرشفة استوديوك في "قاعة المشاهير"، وتبدأ موسماً جديداً بميزانية جديدة.</li>
              </ul>
            </div>
          ),
          accent: "from-cyan-500/20 to-transparent",
          border: "border-cyan-500/30"
        },
        {
          id: 2,
          icon: <Coins className="w-8 h-8 text-emerald-400" />,
          title: "2. الميزانية الافتتاحية (The Starting Budget)",
          content: (
            <div className="space-y-2 text-zinc-300">
              <p>مع انطلاق كل موسم جديد، يمنحك المستثمرون <strong className="text-emerald-400">400 مليون دولار</strong> (كاش افتراضي) في محفظة استوديوك الخاصة بهذا الموسم.</p>
              <p>استخدم هذا الكاش لشراء حقوق توزيع الأفلام التي تتوقع نجاحها.</p>
            </div>
          ),
          accent: "from-emerald-500/20 to-transparent",
          border: "border-emerald-500/30"
        },
        {
          id: 3,
          icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
          title: "3. سوق الانتقالات والتسعير الديناميكي (Dynamic Pricing)",
          content: (
            <div className="space-y-4 text-zinc-300">
              <p>السوق يعرض فقط الأفلام التي ستصدر خلال نطاق الموسم الحالي.</p>
              <div className="bg-blue-950/40 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-300 mb-2 font-semibold flex items-center gap-2"><Info className="w-5 h-5"/> الأسعار متغيرة!</p>
                <p className="text-sm leading-relaxed">نظامنا يراقب "التريند" والشعبية (Hype) لكل فيلم عالمياً بشكل لحظي.</p>
              </div>
              <p><strong className="text-amber-400">قاعدة الهايب:</strong> إذا زاد الكلام عن الفيلم ونزل له إعلان تشويقي قوي، سيرتفع سعره.ولكن سعره لا ينخفض مثلا اذا كان ب 10 وزراد ل 50 ممكن يزيد اكثر لكن لايقل عن 50.</p>
              <p><strong className="text-blue-400">نصيحة للمحترفين:</strong> استغل تذبذب الأسعار واشترِ الأفلام وهي في أقل سعر لها قبل أن تنفجر شعبيتها. (الأسعار تتراوح بين 10 مليون كحد أدنى و300 مليون كحد أقصى).</p>
            </div>
          ),
          accent: "from-blue-500/20 to-transparent",
          border: "border-blue-500/30"
        },
        {
          id: 4,
          icon: <Lock className="w-8 h-8 text-red-400" />,
          title: "4. إغلاق الشراء (The Deadline)",
          content: (
            <div className="space-y-2 text-zinc-300">
              <p>بمجرد أن يبدأ عرض الفيلم رسمياً في دور العرض الحقيقية (حالة IN_THEATERS)، يُغلق باب الشراء فوراً.</p>
              <p className="text-red-300 bg-red-950/20 p-3 rounded-lg border border-red-500/10">لن تتمكن من شراء الفيلم بعد نزوله السينما، ولن تتمكن من بيعه أو التراجع عن شرائه. قرارك نهائي بمجرد عرض الفيلم.</p>
            </div>
          ),
          accent: "from-red-500/20 to-transparent",
          border: "border-red-500/30"
        },
        {
          id: 5,
          icon: <Trophy className="w-8 h-8 text-amber-400" />,
          title: "5. الأرباح وتقييم الاستوديو (Net Worth)",
          content: (
            <div className="space-y-4 text-zinc-300">
              <p>الترتيب في اللعبة لا يعتمد على نقاط، بل على <strong className="text-amber-400">"القيمة السوقية للاستوديو"</strong> (Net Worth).</p>
              <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 font-mono text-sm text-left flex justify-end" dir="ltr">
                <span><span className="text-amber-400 font-semibold">Net Worth</span> = (Remaining Cash) + (Real Box Office Revenues)</span>
              </div>
              <div className="bg-emerald-950/20 border-r-2 border-emerald-500 p-4 text-emerald-300 text-sm">
                يتم تحديث إيرادات شباك التذاكر (Box Office) يومياً بناءً على الأرقام الحقيقية في الواقع. كل دولار يحققه الفيلم في الحقيقة، يضاف مباشرة إلى قيمتك السوقية في اللعبة.
              </div>
            </div>
          ),
          accent: "from-amber-500/20 to-transparent",
          border: "border-amber-500/30"
        },
        {
          id: 6,
          icon: <Users className="w-8 h-8 text-purple-400" />,
          title: "6. الدوريات التنافسية (Leagues)",
          content: (
            <div className="space-y-3 text-zinc-300">
              <p>التنافس مع الأصدقاء هو جوهر اللعبة:</p>
              <ul className="list-disc pr-5 space-y-2 text-zinc-400 text-sm">
                <li>يمكنك إنشاء دوري خاص أو الانضمام لدوريات عامة (بحد أقصى 100 عضو لكل دوري).</li>
                <li><strong className="text-purple-300">قانون الملكية:</strong> يمكنك امتلاك حتى 3 دوريات خاصة بك في الموسم الواحد.</li>
                <li>الدوريات مرتبطة بالموسم؛ بمجرد انتهاء الموسم، تُعلن لوحة المتصدرين النهائية ويتم تتويج البطل.</li>
              </ul>
            </div>
          ),
          accent: "from-purple-500/20 to-transparent",
          border: "border-purple-500/30"
        },
        {
          id: 7,
          icon: <Medal className="w-8 h-8 text-yellow-500" />,
          title: "7. الترتيب النهائي والأرشيف",
          content: (
            <div className="space-y-2 text-zinc-300">
              <p>عند إغلاق الموسم، يتم حساب <strong className="text-yellow-500">الترتيب النهائي</strong> (Final Rank) لكل اللاعبين وحفظه في بروفايلك للأبد.</p>
              <p className="text-lg text-white font-semibold mt-4">من سيحقق لقب "أفضل منتج لعام 2026"؟</p>
            </div>
          ),
          accent: "from-yellow-500/20 to-transparent",
          border: "border-yellow-500/30"
        }
      ],
      footer: "ملاحظة للإدارة: هذا الدليل هو المرجع الرسمي للاعبين، ويتم تحديثه تلقائياً مع إضافة أي ميزات أو قوى مساعدة (Power-ups) جديدة.\n\nهل أنت مستعد لبناء إمبراطوريتك السينمائية؟ 🎥✨"
    }
  };

  const currentContent = content[lang];

  return (
    <div className={`min-h-[100dvh] bg-[#050505] text-zinc-100 selection:bg-amber-500/30 pb-24`} dir={isAr ? "rtl" : "ltr"}>
      {/* Cinematic Header Background */}
      <div className="relative h-[35vh] min-h-[320px] w-full flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-[#050505]/70 to-[#050505] z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-screen blur-[2px] transition-all duration-1000"
          style={{ backgroundImage: 'url("/how-it-works-bg.png")' }}
        />
        
        {/* Language Toggle and Title */}
        <div className="container mx-auto px-4 sm:px-6 md:px-8 z-20 pb-12 max-w-5xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-neutral-200 to-neutral-500 drop-shadow-sm">
              {isAr ? "دليل اللعبة" : "How to Play"}
            </h1>
            <Button 
              onClick={toggleLang} 
              variant="outline" 
              className="bg-zinc-900/50 border-white/10 hover:bg-white/10 hover:border-white/20 text-white backdrop-blur-md rounded-full px-6 py-5 transition-all duration-300 shadow-xl"
            >
              {isAr ? (
                <span className="flex items-center gap-2 font-medium">English <ArrowRight className="w-4 h-4 text-amber-500" /></span>
              ) : (
                <span className="flex items-center gap-2 font-medium"><ArrowLeft className="w-4 h-4 text-amber-500" /> العربية</span>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 -mt-8 z-30 relative max-w-5xl">
        {/* Intro Section */}
        <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 md:p-10 mb-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white tracking-wide leading-tight">
            {currentContent.title}
          </h2>
          <div className="text-lg leading-relaxed text-zinc-300 max-w-3xl">
            {currentContent.intro}
          </div>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="space-y-6 md:space-y-12 relative max-w-4xl mx-auto">
          {currentContent.steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start group`}
            >
              {/* Desktop Connecting Line */}
              {index !== currentContent.steps.length - 1 && (
                <div className={`hidden md:block absolute ${isAr ? 'right-[47px]' : 'left-[47px]'} top-24 bottom-[-48px] w-0.5 bg-gradient-to-b from-white/10 to-transparent z-0`} />
              )}

              {/* Icon Bubble */}
              <div className={`relative shrink-0 flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] bg-zinc-900/80 backdrop-blur-xl border ${step.border} shadow-2xl overflow-hidden z-10 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1`}>
                <div className={`absolute inset-0 bg-gradient-to-br opacity-10 ${step.accent} group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative z-10 transform scale-75 md:scale-100 transition-transform duration-500">
                  {step.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 w-full bg-zinc-900/40 backdrop-blur-sm border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-zinc-900/60 transition-all duration-300 relative overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:border-white/10`}>
                <div className={`absolute top-0 opacity-10 md:opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${isAr ? 'right-0' : 'left-0'} w-full h-full bg-gradient-to-br ${step.accent} pointer-events-none`} />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-5 flex items-center gap-3">
                  {step.title}
                </h3>
                <div className="text-base md:text-lg leading-relaxed font-normal">
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center">
          <p className="whitespace-pre-wrap text-sm text-zinc-500/80 italic px-6 bg-zinc-900/30 py-4 rounded-2xl border border-white/5 inline-block max-w-2xl backdrop-blur-sm">
            {currentContent.footer}
          </p>
        </div>
      </div>
    </div>
  );
}