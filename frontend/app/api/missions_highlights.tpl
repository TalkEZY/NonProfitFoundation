{exp:http_header content_type="application/json"}
    {
        "highlights" : [
          {exp:channel:entries channel="hearing_missions" dynamic="no" disable="{global:param_disable_default}" backspace="2"} {
              "id"                    : "{url_title}",
              "title"                 : "{if mission_display_title}{exp:json_encode}{mission_display_title}{/exp:json_encode}{if:else}{exp:json_encode}{title}{/exp:json_encode}{/if}",
              "subtitle"              : "{if mission_display_title}{exp:json_encode}{mission_display_title}{/exp:json_encode}{if:else}{exp:json_encode}{title}{/exp:json_encode}{/if}",
              "excerpt"               : "{exp:json_encode}{mission_excerpt}{/exp:json_encode}",

              "video"                 : "{mission_video_url}",
              "featured"              : "{mission_featured}",

              "image"                 : "{mission_image:url}",
              "thumbnail_image_url"   : "{mission_thumb_image}",
              "header_image_url"      : "{if mission_image}{mission_image}{if:else}{mission_thumb_image}{/if}",

              "rawdate"               : "{mission_date format='%U'}",
              "date"                  : "{mission_date format='%m/%d/%Y'}",
              "year"                  : "{mission_date format="%Y"}",
              "region"                : "{mission_region}{option_name}{/mission_region}",
              "country"               : "{mission_country}{option_name}{/mission_country}"
            }, {/exp:channel:entries}
        ],

      {!-- All the countries, grouped by region --}
      {exp:stash:set_list name="regions" parse_tags="yes"}
        {exp:activerecord select="field_id_97 AS region" from="exp_channel_data" group_by="region" where="field_id_97 != ''" parse="inward"}
            {stash:region}{region}{/stash:region}
            {stash:region_label}{exp:hundies_option_label field_id="97" option="{region}"}{/stash:region_label}
        {/exp:activerecord}
      {/exp:stash:set_list}

      {exp:stash:get_list name="regions"}
        {exp:stash:set_list name="countries" context="{region}" parse_tags="yes"}
            {exp:activerecord select="field_id_96 AS country" from="exp_channel_data" group_by="country" where="field_id_97 = '{region}'" parse="inward"}
                {stash:name}{country}{/stash:name}
            {/exp:activerecord}
        {/exp:stash:set_list}
      {/exp:stash:get_list}

      "categories" :  [
        {exp:stash:get_list name="regions" backspace="2"} {
            "region" : "{region_label}",
            "countries" : [{exp:stash:get_list:nested name="countries" context="{region}" backspace="1"}"{name}",{/exp:stash:get_list:nested}]
        }, {/exp:stash:get_list}
      ],

      {!-- All the years that have entries --}
      "years" : [
      {exp:activerecord 
        select="FROM_UNIXTIME(field_id_95, '%Y') as year" 
        distinct="yes" 
        from="channel_data"
        join="channel_titles"
        on="channel_data.entry_id = channel_titles.entry_id"
        join_type="left"
        where:channel_titles.channel_id="16"
        where:channel_titles.status="open"
        order_by="field_id_95 desc" 
        backspace="2"}
      {
        "name"  : "{year}", 
        "value" : "{year}"
      }, {/exp:activerecord}
      ]
    }
