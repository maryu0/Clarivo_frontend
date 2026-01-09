import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlayCircle, Mic, FileBarChart, Users, Settings, LogOut, Activity } from 'lucide-react';
export function Sidebar() {
  const navItems = [{
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/'
  }, {
    icon: PlayCircle,
    label: 'Session Launcher',
    path: '/launcher'
  }, {
    icon: Mic,
    label: 'Recording',
    path: '/record'
  }, {
    icon: FileBarChart,
    label: 'Results & Analysis',
    path: '/results'
  }, {
    icon: Users,
    label: 'Patients',
    path: '/patients'
  }];
  return <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0 z-10 shadow-sm">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
        <div className="bg-primary p-2 rounded-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">
            SpeechLab
          </h1>
          <p className="text-xs text-gray-500 font-medium">Clinical Suite</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(item => <NavLink key={item.path} to={item.path} className={({
        isActive
      }) => `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>)}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </button>
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-1">
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>

      <div className="p-6 bg-gray-50 m-4 rounded-xl">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
            DR
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Dr. Reynolds</p>
            <p className="text-xs text-gray-500">Lead Therapist</p>
          </div>
        </div>
      </div>
    </aside>;
}