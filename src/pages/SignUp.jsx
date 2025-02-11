import React from 'react';

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full input input-bordered" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input type="password" className="w-full input input-bordered" required />
          </div>
          <button type="submit" className="w-full btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;