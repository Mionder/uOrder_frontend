// Спрощений приклад компонента DemoModal
export const DemoModal = ({ isOpen, onClose }: any) => {
  return (
    <div onClick={onClose} className="fixed inset-0 z-[800] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-white font-black uppercase text-xs tracking-widest">
        Закрити [ESC]
      </button>
      
      <div className="relative w-full max-w-[380px] aspect-[9/19] bg-[#111] rounded-[3rem] border-[8px] border-[#222] shadow-[0_0_80px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* Внутрішній екран телефону */}
        <iframe 
          src="/demo" 
          className="w-full h-full border-none"
          title="uOrder Demo Menu"
        />
        
        {/* Динамічний острівець (Dynamic Island) */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" />
      </div>
      
      {/* Підказка збоку */}
      <div className="hidden lg:block absolute left-[calc(50%+220px)] max-w-xs space-y-6">
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="text-white font-black italic tracking-tighter text-xl mb-2 italic">Спробуйте!</div>
          <p className="text-gray-400 text-sm leading-relaxed">Це саме те, що побачить ваш гість. Спробуйте проскролити категорії та полайкати страви.</p>
        </div>
      </div>
    </div>
  );
}