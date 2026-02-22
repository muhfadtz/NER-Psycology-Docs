import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, Search, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { docData } from './data/docs';

export default function App() {
  const [activeSection, setActiveSection] = React.useState(docData[0].items[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Handle filtering
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return docData;

    const query = searchQuery.toLowerCase();
    return docData.map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        category.title.toLowerCase().includes(query)
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);

  // Find the active content
  const activeContent = docData
    .flatMap((cat) => cat.items)
    .find((item) => item.id === activeSection);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold font-mono">
                ST
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">
                SpeechtoText
              </span>
            </div>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium border border-slate-200">
              v1.0.2
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="" className="hover:text-orange-600 transition-colors">Docs</a>
            </div>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex items-start">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] lg:overflow-y-auto
            ${isMobileMenuOpen ? 'translate-x-0 top-16' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-4 lg:py-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <nav className="space-y-8">
              {filteredData.length > 0 ? (
                filteredData.map((category) => (
                  <div key={category.title}>
                    <h3 className="font-semibold text-slate-900 text-sm tracking-wider uppercase mb-3 px-2">
                      {category.title}
                    </h3>
                    <ul className="space-y-1">
                      {category.items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSectionClick(item.id)}
                            className={`
                              w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between group
                              ${activeSection === item.id
                                ? 'bg-orange-50 text-orange-700 font-medium'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                            `}
                          >
                            <span>{item.title}</span>
                            {activeSection === item.id && (
                              <ChevronRight size={14} className="text-orange-500" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="px-2 py-8 text-center">
                  <p className="text-sm text-slate-500">No results found for "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-xs font-medium text-orange-600 hover:text-orange-700"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {activeContent ? (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 pb-8 border-b border-slate-200">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
                    {activeContent.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Last updated: Feb 21, 2026</span>
                  </div>
                </div>

                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-semibold prose-a:text-orange-600 hover:prose-a:text-orange-700 prose-code:text-orange-600 prose-pre:bg-slate-900 prose-pre:text-slate-50">
                  {activeContent.content}
                </div>

                {/* Navigation Footer */}
                <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between">
                  {(() => {
                    const allItems = docData.flatMap(c => c.items);
                    const currentIndex = allItems.findIndex(i => i.id === activeSection);
                    const prev = allItems[currentIndex - 1];
                    const next = allItems[currentIndex + 1];

                    return (
                      <>
                        {prev ? (
                          <button
                            onClick={() => handleSectionClick(prev.id)}
                            className="group flex flex-col items-start gap-1"
                          >
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Previous</span>
                            <span className="text-lg font-medium text-slate-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                              ← {prev.title}
                            </span>
                          </button>
                        ) : <div></div>}

                        {next ? (
                          <button
                            onClick={() => handleSectionClick(next.id)}
                            className="group flex flex-col items-end gap-1"
                          >
                            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Next</span>
                            <span className="text-lg font-medium text-slate-900 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                              {next.title} →
                            </span>
                          </button>
                        ) : <div></div>}
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            ) : (
              <div>Content not found</div>
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
