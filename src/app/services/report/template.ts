import { Team } from '../api/teams/model';
import { Report } from './model';
import { template } from 'lodash';

export function getTemplate(report: Report, settings: Team) {

    const compiled = template(`
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your clean has been completed</title>
      <style type="text/css">
    
      @import url('https://fonts.googleapis.com/css?family=Roboto:300');

      .layout_table {
        font-family: 'Roboto', Arial, Helvetica, sans-serif;
        font-size:15px;
        line-height:22px;
        background-color: <%= settings.emailBodyBackgroundColour %>;
        color: <%= settings.emailTextColour %>;
        font-weight: 200;
      }
    
        table {
          border-collapse:collapse;
        }
    
        h1, h2, h3 {
          color: <%= settings.emailHighlightColour %>;
          font-weight: 200;
        }
    
        .step {
          border-top: 1px solid #d8d8d8;
        }
    
        .step td {
          font-size: 14px;
          padding: 10px 0px;
        }

        .step td.step-description {
          padding: 10px 10px 10px 0px;
        }
    
        h1 {
          font-size: 19px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 51px;
        }
    
        h3 {
          font-size: 13px;
          margin: 5px 0px;
        }
    
        p {
          margin-bottom: 30px;
          margin-top: 0px;
        }
    
        .header {
          background-color: <%= settings.emailHeadingBackgroundColour %>;
          color: <%= settings.emailHeadingTextColour %>;
          font-size:20px;
          padding: 20px;
        }
    
        @media(max-width:480px) {
          table[class=main_table],
          table[class=layout_table] {
            width: 300px !important;
          }
          table[class=layout_table] tbody tr td.header_image img {
            width: 300px !important;
            height: auto !important;
          }
        }
    
        a {
          color: #37aadc
        }

        .complete {
          font-style: italic;
          color: #50B600;
          text-align: center;
        }
    
        .incomplete {
          font-style: italic;
          text-align: center;
        }

      </style>
    </head>
    
    <body>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
          <tr>
            <td align="center" valign="top">
    
              <!-- Wrapper -->
              <table border="0" cellpadding="0" cellspacing="0" class="main_table" width="600">
                <tbody>
                  <tr>
                    <td>
    
                      <!-- Main -->
                      <table border="0" cellpadding="0" cellspacing="0" class="layout_table"
                        width="100%">
                        <tbody>
    
                          <!-- Header -->
                          <tr>
                            <td align="center" class="header">
                            <% if (settings.logoPath) { %>
                              <img src="<%= settings.logoPath %>"style="border:0;display:block;">
                              <% } else { %>
                              <%= settings.name.toUpperCase() %>
                              <% } %>
                            </td>
                          </tr>
    
                          <!-- Spacing Row -->
                          <tr>
                            <td style="font-size:50px;line-height:50px;margin:0;padding:0;">&nbsp;</td>
                          </tr>
    
                          <!-- Body -->
                          <tr>
                            <td align="center" valign="top">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="85%">
                                <tbody>
                                  <tr>
                                    <td align="left" colspan="2">
                                        <p><strong>Hi <%= report.checklist.clientName %> !</strong></p>
                                        <% if (settings.emailHeader) { %><p><%= settings.emailHeader %></p><% } %>
                                        <h1><%= report.checklist.name.toUpperCase() %></h1>
                                    </td>
                                  </tr>
                                </tbody>
                                <% _.forEach(report.checklist.checklist, function(group) { %>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h3><%- group.groupName.toUpperCase() %></h3>
                                            </td>
                                        </tr>
                                        <% _.forEach(group.tasks, function(step) { %>
                                            <tr class="step">
                                                <td class="step-description">
                                                    <%- step.description %>
                                                </td>
                                                <td align="right">
                                                    <% if (step.state) { %>
                                                      <div class="complete">
                                                        Complete
                                                      </div>
                                                    <% } else { %>
                                                      <div class="tick incomplete">
                                                      -
                                                      </div>
                                                    <% } %>
                                                </td>
                                            </tr>
                                        <% }); %>
                                        <tr>
                                        <td style="font-size:30px;line-height:30px;margin:0;padding:0;">&nbsp;</td>
                                      </tr>
                                    </tbody>
                                <% }); %>
                                <% if (report.notes) { %>
                                <tbody>
                                  <tr>
                                    <td>
                                        <h3>NOTES</h3>
                                    </td>
                                  </tr>
                                  <tr class="step">
                                      <td colspan="2">
                                      <%- report.notes %>
                                      </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:30px;line-height:30px;margin:0;padding:0;">&nbsp;</td>
                                      </tr>
                                </tbody>
                                <% } %>
                                <% if (settings.emailFooter) { %>
                                <tbody>
                                  <tr>
                                    <td align="left" colspan="2">
                                        <p><%= settings.emailFooter %></p>
                                    </td>
                                  </tr>
                                </tbody>
                                <% } %>
                              </table>
                            </td>
                          </tr>
    
    
                          <!-- Spacing Row -->
                          <tr>
                            <td style="font-size:58px;line-height:58px;margin:0;padding:0;">&nbsp;</td>
                          </tr>
    
                          <!-- Footer -->
                          <tr>
                            <td align="left">
                              
                            </td>
                          </tr>
    
                        </tbody>
                      </table>
    
                    </td>
                  </tr>
                </tbody>
              </table>
    
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    
    </html>
    `);

    return compiled({ 'report': report, 'settings': settings });
};