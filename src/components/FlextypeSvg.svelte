<script>
  export let size = "100%";
  let customClass = "";
  export { customClass as class };

  if (size !== "100%") {
    size = size.slice(-1) === 'x' 
          ? size.slice(0, size.length -1) + 'em'
          : parseInt(size) + 'px';
  }
</script>
<svg width={size} height={size} fill="none" viewBox="0 0 180 180" class="flextype {customClass}">
	<circle fill="black" cx="90" cy="90" r="90"/>
	<path fill="white" d="M65.463 46.035l-11.331 90.53 34.425-.028 4.551-34.314 21.282.177 2.993-21.381-21.915-.168 1.158-9.19 28.094-.046 3.299-25.856-62.556.276z"/>
</svg>
