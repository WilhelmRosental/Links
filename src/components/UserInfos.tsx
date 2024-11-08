import Link from "next/link";
import Image from "next/image";
import Avatar from "@/images/avatar.jpeg";
import NowPlaying from "@/components/NowPlaying";
import { Heading, Text, Card } from "@radix-ui/themes";

const UserInfos: React.FC = () => {
  return (
    <div>
      <Image
        src={Avatar}
        width={120}
        height={120}
        alt="Wilhelm Rosental Avatar"
        className="mx-auto mb-4 rounded-full w-auto h-auto"
        priority
      />

      <Heading
        as="h1"
        size="7"
        className="text-purple-100 text-5xl md:text-6xl font-bold leading-tighter tracking-tighter mb-4"
      >
        Wil.
      </Heading>
      <Heading
        as="h2"
        size="5"
        className="text-2xl md:text-xl leading-tighter tracking-tighter mb-4 text-transparent text-gradient-primary"
      >
        Optimistic Developer
      </Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
        velit, vulputate eu pharetra nec, mattis
      </Text>

      <NowPlaying />

      <Card asChild>
        <Link
          className="flex flex-row"
          href="https://www.instagram.com/nathan.hll/"
          target="_blank"
        >
          <Text color="gray" size="2">
            Instagram
          </Text>
        </Link>
      </Card>
    </div>
  );
};

export default UserInfos;
