'use client';

import Image from 'next/image';
import Link from 'next/link';

const adData = [
  {
    title: 'Dịch vụ phổ biến',
    heading: 'Massage thư giãn',
    description: 'Trải nghiệm thư giãn tuyệt đối với liệu pháp massage chuyên nghiệp.',
    buttonText: 'Khám phá',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    image: 'YaGdRmiB.jpeg',
    href: '/services/massage',
  },
  {
    title: 'Ưu đãi đặc biệt',
    heading: 'Giảm giá 50%\ncho lần đầu',
    description: 'Chỉ áp dụng cho khách hàng mới đăng ký đặt lịch online.',
    buttonText: 'Đặt lịch ngay',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-800',
    image: '/ukCSG6hQ.jpeg',
    href: '/promotions',
  },
  {
    title: 'Cộng đồng',
    heading: 'Review các spa uy tín, chất lượng',
    description: 'Hơn 100.000 người đã chia sẻ trải nghiệm trên BeautyConnect.',
    buttonText: 'Kết nối',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    image: '/kh-wJ4lu.jpeg',
    href: '/products/skincare',
  },
];

export default function AdSection() {
  return (
    <section className="w-full px-4 py-10 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {adData.map((item, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 flex flex-col justify-between h-full min-h-[440px] ${item.bgColor}`}
          >
            <div className="flex flex-col flex-grow">
              <div className={`text-sm font-semibold mb-2 ${item.textColor}`}>
                {item.title}
              </div>
              <h3 className="text-xl font-bold whitespace-pre-line mb-2">
                {item.heading}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            </div>

            {item.image && (
              <div className="mt-auto w-full h-40 overflow-hidden rounded-md">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <Link href={item.href}>
              <button className="mt-4 bg-white border rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100">
                {item.buttonText}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
