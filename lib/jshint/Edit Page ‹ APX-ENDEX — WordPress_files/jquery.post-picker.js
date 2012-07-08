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
            if( widget.id.indexOf( "postpicker-widget" ) !== -1 )
            {              
                var oldInstance = $( widget ).data( "widgetlistposts" );
                        
                if( ! oldInstance )
                {
                    $( widget ).widgetListPosts();
                }
            }
        });
    };
    
    $.fn.widgetListPosts = function( )
    {
        var $widget              = this
        ,   $selectedPostSnippet = undefined
        ,   $widgetPostIdsList   = $widget.find( ".widgetPostIdsList" )
        ;
        
        $widget.data( "widgetlistposts", true );

        var selectedPostIds = $.parseJSON( $widgetPostIdsList.val() ) || {};

        //  Need to make all my events a delegate of widget... Thanks to the page widgets plugin... cant trust my own html :(
        //
        $widget.delegate( ".widgetPostsTypeSelect"         , "change", saveWidget );
        $widget.delegate( ".widgetPostAddButton"           , "click", addPost );
        $widget.delegate( ".widgetPostSelectedDeleteButton", "click", deleteSelectedPost );

        function addPost()
        {
            var $selectedPostsList = $widget.find( ".widgetPostsSelectedList" )
            ,   $selectPosts       = $widget.find( ".widgetPostsSelect" )
            ;            
            
            if( $selectedPostSnippet === undefined )
            {
                $selectedPostSnippet = $widget.find( ".widgetPostSelectedSnippet" ).removeClass( "widgetPostSelectedSnippet" ).remove()
            }
            
            var $clone    = $selectedPostSnippet.clone()
            ,   $selected = $selectPosts.find( ":selected" )
            ,   id        = parseInt( $selected.val(), 10 )
            ,   name      = $selected.text()
            ;

            if( ! selectedPostIds.hasOwnProperty( id ) )
            {                 
                $clone.data( "postid", { "name" : name, "id" : id } );
                $clone.find( ".value" ).text( name );

                selectedPostIds[ id ] = name;

                $selectedPostsList.append( $clone );

                generateIdField();
            }
            return false;
        }

        function deleteSelectedPost()
        {
            var $li  = $( this ).parent()
            ,   liId = ( $li.data( "postid" ) && $li.data( "postid" ).id ) || $li.attr( "data-postid" )
            ;

            delete selectedPostIds[ liId ]

            generateIdField();

            $li.fadeOut(function(){
               $li.remove(); 
            });

            return false;
        }

        function generateIdField()
        {
            $widgetPostIdsList = $widget.find( ".widgetPostIdsList" );
            
            $widgetPostIdsList.val( JSON.stringify( selectedPostIds ) );
        }
        
        function saveWidget()
        {
            wpPWidgets.save( $(this).parents(".widget"), 0, 1, 0 )
        }
    };
})(jQuery);