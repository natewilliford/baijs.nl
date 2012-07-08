;(function($)
{       
    $( document ).ready( function()
    {
        initialize();  
        
        //  We need to to this the dirty way because the page-widgets plugin is crap.
        //
        $( '#widgets-right' ).bind( "update", initialize );
    });
    
    function initialize()
    {
        $( ".widget" ).each( function( index, widget )
        {
            if( widget.id.indexOf( "downloadspicker-widget" ) !== -1 )
            {
                var oldInstance = $( widget ).data( "widgetlistdownloads" );

                if( ! oldInstance )
                {
                    $( widget ).widgetListDownloads();
                }
            }
        });
    };
    
    $.fn.widgetListDownloads = function( )
    {
        var $widget                  = this
        ,   $selectedDownloadSnippet = undefined
        ,   $widgetDownloadIdsList   = $widget.find( ".widgetDownloadIdsList" );
        ;

        $widget.data( "widgetlistdownloads", true );

        var selectedDownloadUrls = $.parseJSON( $widgetDownloadIdsList.val() ) || {};

        //  Need to make all my events a delegate of widget... Thanks to the page widgets plugin... cant trust my own html :(
        //
        $widget.delegate( ".widgetDownloadAddButton"           , "click", addDownload );
        $widget.delegate( ".widgetDownloadSelectedDeleteButton", "click", deleteSelectedDownload )
        $widget.delegate( ".widgetDownloadSelectedName"        , "change", updateSelectedDownload )

        function addDownload()
        {
            var $selectedDownloadsList = $widget.find( ".widgetDownloadsSelectedList" )
            ,   $selectDownloads       = $widget.find( ".widgetDownloadsSelect" )
            ;
            
            if( $selectedDownloadSnippet === undefined )
            {
                $selectedDownloadSnippet = $widget.find( ".widgetDownloadSelectedSnippet" ).removeClass( "widgetDownloadSelectedSnippet" ).remove();
            }
            
            var $clone    = $selectedDownloadSnippet.clone()
            ,   $selected = $selectDownloads.find( ":selected" )
            ,   url       = $selected.val()
            ,   name      = $selected.text()
            ;
            
            if( url !== "" && ! selectedDownloadUrls.hasOwnProperty( name ) )
            {                 
                $clone.data( "download", { "url" : url, "filename" : name, "title" : name } );
                $clone.find( ".widgetDownloadSelectedName" ).val( name );
  
                selectedDownloadUrls[ name ] = {"url" : url, "filename" : name, "title" : name};
   
                $selectedDownloadsList.append( $clone );

                generateIdField();
            }
            
            return false;
        }

        function deleteSelectedDownload()
        {
            var $li      = $( this ).parent()
            ,   fileName = ( $li.data( "download" ) && $li.data( "download" ).filename ) || $li.attr( "data-downloadname" )
            ;

            delete selectedDownloadUrls[ fileName ];

            generateIdField();

            $li.fadeOut(function(){
               $li.remove(); 
            });

            return false;
        }
        
        function updateSelectedDownload()
        {
            var $li       = $( this ).parent()           
            ,   fileName  = ( $li.data( "download" ) && $li.data( "download" ).filename ) || $li.attr( "data-downloadname" )
            ,   fileTitle = $( this ).val();
            ;

            selectedDownloadUrls[ fileName ][ "title" ] = ( fileTitle === "" ? fileName : fileTitle );

            generateIdField();

            return false;
        }

        function generateIdField()
        {
            $widgetDownloadIdsList = $widget.find( ".widgetDownloadIdsList" );
            
            $widgetDownloadIdsList.val( JSON.stringify( selectedDownloadUrls ) );
        }
    };
})(jQuery);