export function ViewModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    var stored = localStorage.getItem('viewMode');
    var viewMode = (stored === 'grid' || stored === 'list') ? stored : 'grid';
    document.documentElement.setAttribute('data-view-mode', viewMode);
  } catch (e) {}
})();
        `,
      }}
    />
  )
}
