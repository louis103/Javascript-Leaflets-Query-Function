
<script type="text/javascript">
map = 'our map object';
// import leaflet js cdn
//first code changing geojson points to layer
var geojson = L.geoJson(data,{
	pointToLayer: function(feature,latlng){
		return L.circleMarker(latlng,{
			radius:5.0,
			fillColor:'#kkkfff',
			color:'#000000',
			weight:1,
			opacity:1.0,
			fillOpacity:1.0
		})
	},
	filter: function(feature,layer){
		//if statements go here!
	}
}).addTo(map);
//second code goes here
var geojson = L.geoJson(data,{
	filter:function(feature,layer){
		return feature.properties.unemployme >= 20;
	}
}).addTo(map);
//third code
$.each(feature.properties.population,function(feature,layer){
	if (layer.population>='100'){
		alert(layer.population);
		return;
	}
})

//fourth code
function filter(feature){
	return feature.properties.population == '120,000';
}
var countries = L.geoJson(data,{
	filter:filter,
	style:getStyle,
	onEachFeature:onEachFeature
}).addTo(map);
//optional styling
countries.setStyle(style);

//fifth code
var towns = L.geoJson(data,{
	filter:function(feature, layer){
		return feature.properties.type == "Town";
	},
	pointToLayer:function(feature, latlng){
		return L.marker(latlng,{

		}).on('mouseover',function(){
			this.bindPopup(feature.properties.type).openPopup();
		});
	}
});
map.fitBounds(towns.getBounds(),{
	padding:[50,50]
});
towns.addTo(map);

//sixth code
var promise = $.geoJSON('business.geojson')
var allbusiness = L.geoJson(data);
var cafes = L.geoJson(data,{
	filter:function(feature, layer){
		return feature.properties.type == "Cafe";
	},
	pointToLayer:function(feature, latlng){
		return L.marker(latlng,{
			icon:Icon
		}).on('mouseover',function(){
			this.bindPopup(feature.properties.type).openPopup();
		});
	}
});
cafes.addTo(map);

//handling the hiding of some features during query
and showing the needed ones
$('#towns').click(function(){
	map.addLayer(towns)
	map.removeLayer(cafes)
});
$('#cafes').click(function(){
	map.addLayer(cafes)
	map.removeLayer(towns)
});
$('#allbusiness').click(function(){
	map.addLayer(cafes)
	map.addLayer(towns)
});

//if color was specified in geojson
var geojson = L.geoJson(data,{
	style:function(feature){
		return {color:feature.properties.color/style};
	},
	onEachFeature:function(feature,layer){
		layer.bindPopup(feature.properties.description);
	},
	filter:function(feature,layer){
		return !(feature.properties.is_true);
	}
}).addTo(map);
//adding more data
geojson.addData(moreData);
map.fitBounds(geojson.getBounds());

//styling single geojson feature
var eastyle = {fillOpacity: 1, opacity: 1, weight: 2, color: 'black', fillColor: 'rgba(196,60,57,0.0)'};
var prtstyle = {fillOpacity: 1, weight: 0.1, color: 'white', fillColor: 'rgba(178,223,138,1.0)'};

var ea_country = new L.geoJSON(data, {style: eastyle}).addTo(map);

var protected_area = new L.geoJSON(protected, {style: prtstyle, 
	onEachFeature: function (feature, layer){
		layer.bindPopup("<table><tr><td><b>Name:</b>"+feature.properties.NAME+"</td></tr>\
			<tr><td><b>Designation:</b>"+feature.properties.DESIG+"</td></tr>\
			<tr><td><b>Status:</b>"+feature.properties.STATUS+"</td></tr></table>")
}});
//another geojson with styling
var smesite = new L.geoJSON(sme, {
	pointToLayer: function(feature, latlng) {
		var circle = L.circleMarker(latlng, smestyle(feature));

		circle.bindPopup("<table><tr><td><b> SME Number</td><td>"+feature.properties.SME_No +"</td></tr>\
			<tr><td><b> Lender</b></td><td>"+feature.properties.Lender+"</td></tr>\
			<tr><td><b> Loanee</b></td><td>"+feature.properties.Loanee+"</td></tr>\
			<tr><td><b> Value Chain</b></td><td>"+ feature.properties.Value_Chain+"</td></tr>\
			<tr><td><b> Country</b></td><td>"+feature.properties.Country+"</td></tr>\
			<tr><td><b> District</b></td><td>"+feature.properties.Country+"</td></tr>\
			<tr><td><b> Ward</b></td><td>"+feature.properties.Country+"</td></tr>\
			<tr><td><b> Nearest Protected Area</b></td><td>"+feature.properties.Nearest+"</td><td>"+feature.properties.Nearest_Dist+"km</td></tr>\
			<tr><td><b> Second Protected Area</b></td><td>"+feature.properties.Second+"</td><td>"+feature.properties.Second_Dist+"km</td></tr>\
			<tr><td><b> Third Protected Area</b></td><td>"+feature.properties.Third+"</td><td>"+feature.properties.Third_Dist+"km</td></tr>\
			</table>");
		return circle;
	},
});

//style function to use optionally
//for circle markers
function smestyle() {
	return {
		radius: 8.0, opacity: 1, color: 'rgba(255,255,255,1.0)', weight: 1, fillOpacity: 1, fillColor: 'rgba(134,139,136,1.0)'
	}
}


</script>