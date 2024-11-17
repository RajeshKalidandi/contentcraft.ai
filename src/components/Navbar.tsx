import React from 'react';
import { Menu, X, Wand2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Wand2 className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ContentCraft.ai</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {currentUser ? (
              <>
                <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
                <button 
                  onClick={handleLogout}
                  className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Sign In
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser ? (
              <>
                <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Features</a>
                <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Pricing</a>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <button className="w-full mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}