function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1">
        {currentPage === 'overview' && <OperationsOverview />}
        {currentPage === 'simulation' && <WhatIfSimulation />}
        {currentPage === 'recommendations' && <Recommendations />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
