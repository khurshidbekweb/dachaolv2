import React, { useRef, useState } from 'react';

const SmsBlog = () => {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]); // Ref massiv  
    // Kiritilgan qiymatni o'zgarishini boshqarish
    const handleChange = (index: number, value: string) => {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);  
      // Agar keyingi input mavjud bo'lsa, unga fokusni o'tkazish
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };  
    // Inputlarga qiymat kiritish
    const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
      if (event.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus(); // Oldingi inputga o'tish
      }
    };
    return (
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        SMS kodini kiriting
                    </h2>
                    <p className="text-center text-gray-600 mb-4">
                        +998 90 123 45 67 raqamiga yuborilgan SMS kodini kiriting
                    </p>
                    <form>
                        <div className="flex justify-between items-center mb-4">
                        {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el!)} // Inputlar refga qo'shiladi
                            type="text"
                            maxLength={1} // Faqat bitta raqam kiritish mumkin
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-400"
                        >
                            Tasdiqlash
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Kodni qabul qilmadingizmi?
                        <button className="text-blue-600 hover:underline focus:outline-none">
                            Qayta yuborish
                        </button>
                    </p>
                </div>
    );
};

export default SmsBlog;