import { useNavigate } from "react-router-dom";
import frogLogo from '../../public/frog.png';
import cheogo from '../../public/converted.svg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-white">
      {/* Основной контейнер с адаптивным SVG */}
      <div className="relative h-[550px] pt-5 px-5 overflow-hidden">
        <svg 
          viewBox="0 0 1440 761" 
          fill="none" 
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path 
            d="M0 0H1440V228.639C1440 228.639 1320.22 174.248 1216 228.639C1103.5 287.351 1043 640.04 886.363 715.688C762 775.75 480.428 620.496 311.863 640.04C138.579 660.131 0 761 0 761V0Z" 
            fill="#00112E"
          />
        </svg>

        {/* Декоративные волны */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-64 overflow-hidden">
            <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="w-full h-full"
            >
              <path 
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                fill="#EFF6FF"
              />
            </svg>
          </div>

          <div className="absolute top-1/3 left-0 right-0 h-64">
            <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="w-full h-full"
            >
              <path 
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
                fill="#DBEAFE"
              />
            </svg>
          </div>
        </div>

        {/* Шапка */}
        <header className="flex justify-between items-center p-6 relative z-10">
          <div className="flex items-center">
            <img src={frogLogo} alt="Logo" className="h-10 w-10" />
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          >
            Авторизация
          </button>
        </header>

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold mb-2 text-white">Электронный дневник.</h1>
            <p className="text-gray-200 text-lg mb-6">весь колледж в телефоне</p>
          </div>
          <div className="flex justify-center">
            <img 
              src={cheogo}
              alt="Electronic diary interface" 
              className="max-h-80"
            />
          </div>
        </div>
      </div>

      {/* Секция возможностей */}
      <div className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Какова цель проекта?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-4 right-4">
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <p className="mt-6">Повышение прозрачности и доступности информации об успеваемости и посещаемости учащихся.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-4 right-4">
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <p className="mt-6">Упрощение взаимодействия между учениками, родителями и учителями.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-4 right-4">
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
              <p className="mt-6">Автоматизация учёта и контроля учебного процесса.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Контактная секция */}
      <div className="bg-gray-100 py-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div></div>
            <div className="mt-6 md:mt-0">
              <h3 className="text-xl font-medium mb-4">Связь с нами</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  <span>@Abemebanana</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                  <span>@barabulka_nk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="bg-gray-200 py-4 text-center text-sm text-gray-600 relative z-10">
        <p>Политика конфиденциальности</p>
      </footer>
    </div>
  );
};

export default HomePage;