import { useStore } from "../store/useStore";

export default function MinistryHeader() {
  const { setSignUpModalOpen, setLoginModalOpen } = useStore();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://images.unsplash.com/photo-1611095564907-25d2ddeeed1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80"
              alt="Ministry Logo"
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-govt-orange">
                PM Internship
              </h1>
              <p className="text-sm text-gray-600">
                Ministry of Corporate Affairs
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSignUpModalOpen(true)}
              className="btn-primary flex items-center"
              data-testid="youth-registration-btn"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Youth Registration
            </button>

            <button
              onClick={() => setLoginModalOpen(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              data-testid="login-btn"
            >
              <svg
                className="w-4 h-4 mr-2 inline"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Login
            </button>

            <div className="text-right">
              <p className="text-sm font-medium">डिजिटल इंडिया</p>
              <p className="text-xs text-gray-600">Digital India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
