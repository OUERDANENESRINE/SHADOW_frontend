export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void px-6 py-10 text-center sm:px-10">
      <p className="font-display text-sm tracking-[0.3em] text-text-muted">
        SHADOW
      </p>
      <p className="mt-2 text-xs text-text-muted/70">
        © {new Date().getFullYear()} Shadow —
        réservés.
      </p>
    </footer>
  );
}
