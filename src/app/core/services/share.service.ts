import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Signals to store HTML content with styles
  job: WritableSignal<SafeHtml>;
  rec: WritableSignal<SafeHtml>;

  selectedValue: WritableSignal<string> = signal('job');

  constructor(private sanitizer: DomSanitizer) {
    // Initialize the signals with sanitized HTML
    this.job = signal(
      this.sanitizer.bypassSecurityTrustHtml(`
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table width="750" align="center" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          <i>More available jobs on
                            <a href="https://www.hrincjobs.com" style="color:#2999CB; text-decoration:underline;">www.hrincjobs.com</a>
                          </i>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      `)
    );

    this.rec = signal(
      this.sanitizer.bypassSecurityTrustHtml(`
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td>
                <table width="750" align="center" border="0" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td>
                        <p>
                          <i>More available jobs on
                            <a href="https://www.hrincjobs.com" style="color:#2999CB; text-decoration:underline;">www.hrincjobs.com</a>
                          </i>
                        </p>
                        <p>How to Apply:</p>
                        <table>
                          <tbody>
                            <tr>
                              <td style="padding-left:10px">
                                <span>- Email:
                                  <a href="mailto:HRINCRecruitment@hrinc.com.kh" style="color:#2999CB; text-decoration:underline;">HRINCRecruitment&#64;hrinc.com.kh</a> /
                                  <a href="mailto:hong.sokheng@hrinc.com.kh" style="color:#2999CB; text-decoration:underline;">hong.sokheng&#64;hrinc.com.kh</a>
                                </span>
                                <br/>
                                <span>- Contact: +855 (85) 99 01 68 / (98) 81 52 89
                                  <a href="https://t.me/SokhengHRINC" style="color:#2999CB; text-decoration:underline;">(&#64;SokhengHRINC)</a>
                                </span>
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
      `)
    );
  }

  // Method to update the selected value
  updateSelectedValue(newValue: string) {
    this.selectedValue.set(newValue);
  }
}
