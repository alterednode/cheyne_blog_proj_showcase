import type { ComponentType } from "react";
import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export type SocialPlatform =
  | "github"
  | "linkedin"
  | "x"
  | "youtube"
  | "email"
  | "discord"
  | "instagram"
  | "tiktok";

export type SocialLinks = Partial<Record<SocialPlatform, string>>;

export type SocialsDisplay = "icons" | "names" | "both";

type SocialMeta = {
  label: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
  external?: boolean;
};

const SOCIAL_META: Record<SocialPlatform, SocialMeta> = {
  github: { label: "GitHub", Icon: FaGithub, external: true },
  linkedin: { label: "LinkedIn", Icon: FaLinkedin, external: true },
  x: { label: "X", Icon: FaXTwitter, external: true },
  youtube: { label: "YouTube", Icon: FaYoutube, external: true },
  email: { label: "Email", Icon: FaEnvelope, external: false },
  discord: { label: "Discord", Icon: FaDiscord, external: true },
  instagram: { label: "Instagram", Icon: FaInstagram, external: true },
  tiktok: { label: "TikTok", Icon: FaTiktok, external: true },
};

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  github: "https://github.com/alterednode",
  linkedin: "https://linkedin.com/in/onyxcheyne/",
  email: "mailto:onyx@cheyne.dev",
};

const DEFAULT_PLATFORM_ORDER: SocialPlatform[] = [
  "github",
  "linkedin",
  "x",
  "youtube",
  "email",
  "discord",
  "instagram",
  "tiktok",
];

export type SocialsProps = {
  links?: SocialLinks;
  display?: SocialsDisplay;
  platforms?: SocialPlatform[];
  className?: string;
  iconSize?: number;
};

export default function Socials({
  links,
  display = "icons",
  platforms,
  className,
  iconSize = 18,
}: SocialsProps) {
  const resolvedLinks = links ?? DEFAULT_SOCIAL_LINKS;
  const orderedPlatforms: SocialPlatform[] =
    platforms && platforms.length > 0
      ? platforms
      : DEFAULT_PLATFORM_ORDER.filter((platform) => Boolean(resolvedLinks[platform]));

  const items = orderedPlatforms
    .map((platform) => {
      const href = resolvedLinks[platform];
      if (!href) return null;
      return { platform, href, ...SOCIAL_META[platform] };
    })
    .filter(Boolean) as Array<
    { platform: SocialPlatform; href: string } & SocialMeta
  >;

  if (items.length === 0) return null;

  return (
    <ul className={`flex items-center gap-2 ${className ?? ""}`}>
      {items.map(({ platform, href, label, Icon, external }) => {
        const isMailto = platform === "email" && href.startsWith("mailto:");
        const isExternal = external || (!isMailto && /^https?:\/\//.test(href));

        const colorClasses =
          "rounded-md border-2 border-primary bg-primary/70 text-foreground transition-colors hover:bg-accent/90 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

        return (
          <li key={platform}>
            <a
              href={href}
              aria-label={display === "icons" ? label : undefined}
              title={label}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer noopener" : undefined}
              className={
                display === "icons"
                  ? `inline-flex h-10 w-10 items-center justify-center ${colorClasses}`
                  : display === "both"
                  ? `inline-flex items-center justify-center gap-2 px-3 py-2 ${colorClasses}`
                  : `inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold ${colorClasses}`
              }
            >
              {display === "icons" ? (
                <Icon size={iconSize} />
              ) : display === "both" ? (
                <>
                  <Icon size={iconSize} />
                  <span className="font-bold">{label}</span>
                </>
              ) : (
                label
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
