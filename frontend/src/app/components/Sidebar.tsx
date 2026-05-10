import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  MapPin,
  Briefcase,
  Compass,
  DollarSign,
  CheckSquare,
  BookOpen,
  Share2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

interface NavItem {
  label: string
  icon: React.ReactNode
  path: string
  children?: NavItem[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    path: '/app/dashboard',
  },
  {
    label: 'My Trips',
    icon: <MapPin className="w-5 h-5" />,
    path: '/app/trips',
  },
  {
    label: 'Explore',
    icon: <Compass className="w-5 h-5" />,
    path: '#',
    children: [
      {
        label: 'City Search',
        icon: <MapPin className="w-4 h-4" />,
        path: '/app/city-search',
      },
      {
        label: 'Activity Search',
        icon: <Briefcase className="w-4 h-4" />,
        path: '/app/activity-search',
      },
      {
        label: 'Shared Trips',
        icon: <Share2 className="w-4 h-4" />,
        path: '/app/shared-trips',
      },
    ],
  },
  {
    label: 'Itinerary',
    icon: <Briefcase className="w-5 h-5" />,
    path: '/app/itinerary',
  },
  {
    label: 'Budget',
    icon: <DollarSign className="w-5 h-5" />,
    path: '/app/budget',
  },
  {
    label: 'Tools',
    icon: <CheckSquare className="w-5 h-5" />,
    path: '#',
    children: [
      {
        label: 'Packing Checklist',
        icon: <CheckSquare className="w-4 h-4" />,
        path: '/app/packing',
      },
      {
        label: 'Trip Notes',
        icon: <BookOpen className="w-4 h-4" />,
        path: '/app/notes',
      },
    ],
  },
  {
    label: 'Profile',
    icon: <Settings className="w-5 h-5" />,
    path: '/app/profile',
  },
]

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [isOpen, setIsOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const handleNavigate = (path: string) => {
    if (path !== '#') {
      navigate(path)
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-[#e8614a] hover:bg-[#d4503a] text-white p-2 rounded-lg transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#0d0d0d] border-r border-white/[0.07] transform transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } font-outfit`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-[#e8614a] flex items-center justify-center text-white text-lg font-bold">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#f0ede8] tracking-wide">Traveloop</h1>
              <p className="text-white/40 text-xs">Travel Planner</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 mt-6 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition cursor-pointer border border-transparent hover:border-white/[0.08]">
            <div className="w-10 h-10 rounded-lg bg-[#e8614a]/10 flex items-center justify-center text-[#e8614a] font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#f0ede8] font-bold text-sm truncate">{user?.name || 'Traveler'}</p>
              <p className="text-white/40 text-xs truncate">{user?.email || 'traveler@example.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto hide-scrollbar">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.label)
                  } else {
                    handleNavigate(item.path)
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition font-medium ${
                  isActive(item.path) && !item.children
                    ? 'bg-[#e8614a]/15 text-[#e8614a] border border-[#e8614a]/30'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.children && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItems.includes(item.label) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Children Items */}
              {item.children && expandedItems.includes(item.label) && (
                <div className="ml-4 mt-2 space-y-2 border-l border-white/10 pl-3">
                  {item.children.map((child) => (
                    <button
                      key={child.label}
                      onClick={() => handleNavigate(child.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition text-sm font-medium ${
                        isActive(child.path)
                          ? 'text-[#e8614a] border-l-2 border-[#e8614a] bg-[#e8614a]/[0.05]'
                          : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {child.icon}
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:text-[#e8614a] hover:bg-[#e8614a]/10 hover:border hover:border-[#e8614a]/20 border border-transparent transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
