
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (!isLogin && !formData.name) {
      toast({
        title: "Please enter your name",
        variant: "destructive"
      });
      return;
    }

    // Mock authentication
    const userData = {
      name: formData.name || 'User',
      email: formData.email
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    onAuthSuccess(userData);
    onClose();
    
    toast({
      title: isLogin ? "Login successful" : "Account created successfully",
      description: `Welcome${userData.name ? `, ${userData.name}` : ''}!`,
    });
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    const userData = {
      name: 'Google User',
      email: 'user@gmail.com'
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    onAuthSuccess(userData);
    onClose();
    
    toast({
      title: "Google login successful",
      description: "Welcome back!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            {isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>
        
        <div className="space-y-4">
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              or
            </span>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>
        </div>
        
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-purple-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
